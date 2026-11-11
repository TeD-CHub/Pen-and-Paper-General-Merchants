"use client";

import dynamic from "next/dynamic";
import { BookOpen } from "lucide-react";

const HeroScene3D = dynamic(
  () => import("@/components/3d/hero-scene").then((mod) => mod.HeroScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-purple-950/20">
        <div className="flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-900/40 px-4 py-2 text-xs font-semibold text-purple-300 backdrop-blur-sm">
          <BookOpen aria-hidden="true" size={16} className="animate-pulse" />
          <span>Loading 3D Scene...</span>
        </div>
      </div>
    ),
  }
);

export function Hero3DWrapper() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroScene3D />
    </div>
  );
}
