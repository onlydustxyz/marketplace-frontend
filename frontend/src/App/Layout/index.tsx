import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import ResponsivityFallback from "./ResponsivityFallback";
import { Toaster } from "src/components/Toaster";

import Header from "./Header";
import Tooltip from "src/components/Tooltip";

export default function Layout() {
  const location = useLocation();
  const homepage = location.pathname === "/";

  return (
    <div className="h-screen w-screen md:fixed">
      {!homepage && (
        <div className="md:invisible md:h-0">
          <ResponsivityFallback />
        </div>
      )}
      <div
        className={classNames("flex flex-col md:h-screen", {
          "invisible md:visible": !homepage,
        })}
      >
        <Header />
        <Outlet />
        <Toaster />
        <Tooltip />
      </div>
    </div>
  );
}
