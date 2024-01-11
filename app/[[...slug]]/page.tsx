"use client";

import dynamic from "next/dynamic";

import "src/datadog";

const Providers = dynamic(() => import("./providers.tsx"), { ssr: false });

export default function Page() {
  return <Providers />;
}
