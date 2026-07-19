import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const response = NextResponse.next();
  // Pass hostname + path to pages via headers so server components can
  // build correct per-domain canonical URLs and metadata (Google Search
  // Console requires a self-referencing canonical on every indexed page).
  response.headers.set("x-domain", hostname);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
