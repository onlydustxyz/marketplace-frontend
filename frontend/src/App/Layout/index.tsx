import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import ResponsivityFallback from "./ResponsivityFallback";
import { Toaster } from "./Toaster";

import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const homepage = location.pathname === "/";

  return (
    <div className="fixed h-screen w-screen">
      {!homepage && (
        <div className="md:invisible md:h-0">
          <ResponsivityFallback />
        </div>
      )}
      <div
        className={classNames("h-screen flex flex-col", {
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
