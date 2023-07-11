import { Outlet, useMatch } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Header from "./Header";
import Tooltip from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { RoutePaths } from "..";

export default function Layout() {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const match = useMatch(`${RoutePaths.ProjectDetails}/*`);
  const hideHeader = match && !isXl;

  return (
    <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      {!hideHeader && <Header />}
      <Outlet />
      <Toaster />
      <Tooltip />
    </div>
  );
}
