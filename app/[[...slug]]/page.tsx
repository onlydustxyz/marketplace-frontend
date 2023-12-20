"use client";

import dynamic from "next/dynamic";
import TagManager from "react-gtm-module";
import "remixicon/fonts/remixicon.css";
import "src/assets/css/index.css";
import "src/assets/fonts/Alfreda/stylesheet.css";
import "src/assets/fonts/Belwe/stylesheet.css";
import "src/assets/fonts/GTWalsheimPro/stylesheet.css";
import config from "src/config";
import "src/datadog";

const Providers = dynamic(() => import("./providers"), { ssr: false });

if (config.GTM_ID) {
  TagManager.initialize({
    gtmId: config.GTM_ID,
  });
}

export default function Page() {
  return <Providers />;
}
