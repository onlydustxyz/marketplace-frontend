import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";

export default function Layout() {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  return (
    <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      <Outlet />
      <Toaster />
      {/* Hide tooltips on mobile */}
      {isSm && <Tooltip />}
    </div>
  );
}
