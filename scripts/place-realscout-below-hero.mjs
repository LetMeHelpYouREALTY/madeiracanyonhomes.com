#!/usr/bin/env node
/**
 * Place <RealScoutListings /> immediately below each page hero.
 * - Ensures import exists
 * - Removes existing RealScoutListings usages
 * - Inserts one instance after the hero block
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("app");
const IMPORT_LINE = `import RealScoutListings from "@/components/realscout/RealScoutListings";`;
const WIDGET = `<RealScoutListings />`;
const HERO_COMMENT =
  /\{\/\*\s*(Domain-Aware Hero|Hero(?:\s+Section)?(?:\s*-\s*[^*]+)?)\s*\*\/\}/;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "page.tsx") out.push(full);
  }
  return out;
}

function findMatchingBlockEnd(lines, startIdx) {
  const open = lines[startIdx].match(/^\s*<([A-Za-z][\w.]*)\b/);
  if (!open) return null;
  const tag = open[1];
  const openRe = new RegExp(`<${tag}(?:\\s|>|/)`, "g");
  const closeRe = new RegExp(`</${tag}>`, "g");
  const selfRe = new RegExp(`<${tag}\\b[^>]*/>`, "g");
  let depth = 0;
  for (let j = startIdx; j < lines.length; j++) {
    const line = lines[j];
    const selfs = (line.match(selfRe) || []).length;
    const opens = (line.match(openRe) || []).length;
    const closes = (line.match(closeRe) || []).length;
    depth += opens - selfs - closes;
    if (depth <= 0) return j;
  }
  return null;
}

function ensureImport(text) {
  if (text.includes("@/components/realscout/RealScoutListings")) return text;
  // Insert after last import
  const lines = text.split("\n");
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) lastImport = i;
  }
  if (lastImport === -1) return `${IMPORT_LINE}\n${text}`;
  lines.splice(lastImport + 1, 0, IMPORT_LINE);
  return lines.join("\n");
}

function processFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const rel = path.relative(process.cwd(), filePath);

  // Skip non-marketing utility pages without a hero comment
  if (!HERO_COMMENT.test(text) && !text.includes("Domain-Aware Hero")) {
    return { rel, status: "skip-no-hero" };
  }

  text = ensureImport(text);

  // Drop every existing widget instance (we'll re-insert one below hero)
  text = text.replace(/\n[ \t]*<RealScoutListings\b[^>]*\/>[ \t]*/g, "\n");

  const lines = text.split("\n");
  let heroCommentIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (HERO_COMMENT.test(lines[i])) {
      heroCommentIdx = i;
      break;
    }
  }
  if (heroCommentIdx === -1) return { rel, status: "skip-no-hero-line" };

  // Next JSX open tag after the hero comment is the hero wrapper
  let openIdx = -1;
  for (let i = heroCommentIdx + 1; i < lines.length; i++) {
    if (/^\s*<[A-Za-z]/.test(lines[i])) {
      openIdx = i;
      break;
    }
  }
  if (openIdx === -1) return { rel, status: "fail-no-open" };

  const endIdx = findMatchingBlockEnd(lines, openIdx);
  if (endIdx == null) return { rel, status: "fail-no-end" };

  // Indentation: match surrounding content (typically 2 spaces less than hero open, or same as comment)
  const indentMatch = lines[heroCommentIdx].match(/^(\s*)/);
  const indent = indentMatch ? indentMatch[1] : "        ";

  // Avoid double-insert if somehow already present next
  const already =
    lines[endIdx + 1]?.includes("RealScoutListings") ||
    lines[endIdx + 2]?.includes("RealScoutListings");
  if (!already) {
    lines.splice(endIdx + 1, 0, "", `${indent}${WIDGET}`);
  }

  fs.writeFileSync(filePath, lines.join("\n"));
  return { rel, status: "ok", afterLine: endIdx + 2 };
}

const results = walk(ROOT).map(processFile);
const ok = results.filter((r) => r.status === "ok");
const skipped = results.filter((r) => r.status.startsWith("skip"));
const failed = results.filter((r) => r.status.startsWith("fail"));

console.log(`Updated: ${ok.length}`);
ok.forEach((r) => console.log(`  ✓ ${r.rel}`));
console.log(`Skipped: ${skipped.length}`);
skipped.forEach((r) => console.log(`  · ${r.rel} (${r.status})`));
if (failed.length) {
  console.log(`Failed: ${failed.length}`);
  failed.forEach((r) => console.log(`  ✗ ${r.rel} (${r.status})`));
  process.exitCode = 1;
}
