"use client";

import RealScoutScript from "@/components/realscout/RealScoutScript";

type RealScoutHeroSearchProps = {
  agentEncodedId: string;
};

/**
 * Hero search widget — RealScout script loads on idle after window load
 * so the LCP hero image can paint without competing for the main thread.
 */
export default function RealScoutHeroSearch({
  agentEncodedId,
}: RealScoutHeroSearchProps) {
  return (
    <>
      <RealScoutScript eagerIdle />
      <div
        dangerouslySetInnerHTML={{
          __html: `<realscout-simple-search agent-encoded-id="${agentEncodedId}"></realscout-simple-search>`,
        }}
      />
    </>
  );
}
