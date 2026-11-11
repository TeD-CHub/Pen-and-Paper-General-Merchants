"use client";

import dynamic from "next/dynamic";
import { BookOpen } from "lucide-react";

const HeroScene3D = dynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[340px] w-full flex-col items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-950/30 p-8 text-center backdrop-blur-md sm:h-[420px] lg:h-[460px]">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 shadow-inner">
          <BookOpen aria-hidden="true" size={28} className="animate-pulse" />
        </div>
        <p className="mt-4 font-heading text-sm font-bold text-purple-200">
          Loading Interactive 3D Experience...
        </p>
        <span className="mt-1 text-xs text-purple-300/70">
          Powered by React Three Fiber
        </span>
      </div>
    ),
  }
);

export function Hero3DWrapper() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-400/25 bg-gradient-to-b from-purple-900/40 to-purple-950/60 p-2 shadow-2xl backdrop-blur-md">
      <HeroScene3D />
    </div>
  );
}
