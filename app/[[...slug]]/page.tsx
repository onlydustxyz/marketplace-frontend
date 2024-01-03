"use client";

import dynamic from "next/dynamic";
import "remixicon/fonts/remixicon.css";
import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/Belwe/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import "src/datadog.ts";

const Providers = dynamic(() => import("./providers/providers.tsx"), { ssr: false });

export default function Page() {
  return <Providers />;
}
