"use client";

import dynamic from "next/dynamic";

const ScrollyScene = dynamic(() => import("./ScrollyScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-darker">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red border-t-transparent" />
        <span className="font-bebas text-sm tracking-[0.2em] text-gold uppercase">
          Bacolav is onderweg...
        </span>
      </div>
    </div>
  ),
});

export default function ScrollySceneClient() {
  return <ScrollyScene />;
}
