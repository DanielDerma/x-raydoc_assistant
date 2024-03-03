"use client";
import { WavyBackground } from "@/components/ui/wavy-background";
import React from "react";

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        X-RayDoc Assistant
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Tools for medical professionals to help them with Chest X-rays for COVID-19.
      </p>
    </WavyBackground>
  );
}
