import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import Skeleton from "src/components/Skeleton";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";

const Header = lazy(() => import("./Header"));

export default function Layout() {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  return (
    <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      <Suspense
        fallback={
          <div className="px-6 py-4 ">
            <Skeleton variant="header" />
          </div>
        }
      >
        <Header />
      </Suspense>
      <Outlet />
      <Toaster />
      {/* Hide tooltips on mobile */}
      {isSm && <Tooltip />}
    </div>
  );
}
