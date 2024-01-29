"use client";

import dynamic from "next/dynamic";

import "src/datadog";

const Providers = dynamic(() => import("./providers"), { ssr: false });

export default function Page() {
  return <Providers />;
}
