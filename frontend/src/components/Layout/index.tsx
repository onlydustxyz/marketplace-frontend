import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { RESPONSIVE } from "src/utils/featureFlags";
import ResponsivityFallback from "../ResponsivityFallback";
import { Toaster } from "../Toaster";

import Header from "./Header";

export default function Layout() {
  return (
    <div>
      {!RESPONSIVE && (
        <div className="md:invisible visible md:h-0">
          <ResponsivityFallback />
        </div>
      )}
      <div
        className={classNames("h-screen flex flex-col", {
          "md:visible invisible ": !RESPONSIVE,
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
