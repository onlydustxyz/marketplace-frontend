"use client";

import "src/datadog";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("./providers.tsx"), { ssr: false });

export default function Page() {
  return <Providers />;
}
