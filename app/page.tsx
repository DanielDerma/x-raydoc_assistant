"use client";

import { Chat } from "@/components/chatopensource";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function WavyBackgroundDemo() {
  return (
    <div className="relative">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          Chat DOc Doc.
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          The Tool for medical professionals.
        </p>
      </WavyBackground>
      <Chat />
    </div>
  );
}
