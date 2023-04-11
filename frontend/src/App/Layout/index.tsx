import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import ResponsivityFallback from "./ResponsivityFallback";
import { Toaster } from "src/components/Toaster";

import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const homepage = location.pathname === "/";

  return (
    <div className="md:fixed h-screen w-screen">
      {!homepage && (
        <div className="md:invisible md:h-0">
          <ResponsivityFallback />
        </div>
      )}
      <div
        className={classNames("md:h-screen flex flex-col", {
          "invisible md:visible": !homepage,
        })}
      >
        <Header />
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
