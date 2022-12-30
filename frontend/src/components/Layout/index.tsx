import { Outlet } from "react-router-dom";
import ResponsivityFallback from "../ResponsivityFallback";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <div className="md:invisible visible md:h-0">
        <ResponsivityFallback />
      </div>
      <div className="md:visible invisible">
        <Header />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
