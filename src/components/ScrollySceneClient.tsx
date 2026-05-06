"use client";

import dynamic from "next/dynamic";

const ScrollyScene = dynamic(() => import("./ScrollyScene"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-darker" aria-hidden />,
});

export default function ScrollySceneClient() {
  return <ScrollyScene />;
}
