import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import { RESPONSIVE } from "src/utils/featureFlags";
import ResponsivityFallback from "../ResponsivityFallback";
import { Toaster } from "../Toaster";

import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const homepage = location.pathname === "/";

  return (
    <div>
      {(!RESPONSIVE || !homepage) && (
        <div className="md:invisible md:h-0">
          <ResponsivityFallback />
        </div>
      )}
      <div
        className={classNames("h-screen flex flex-col", {
          "invisible md:visible": !RESPONSIVE,
        })}
      >
        <Header />
        <div className="px-2 sm:px-6 pb-2 sm:pb-6 flex-1">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
}
