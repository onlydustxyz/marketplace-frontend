import { Outlet } from "react-router-dom";
import { ToasterProvider } from "src/hooks/useToaster/useToaster";
import ResponsivityFallback from "../ResponsivityFallback";
import { Toaster } from "../Toaster";

import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <div className="md:invisible visible md:h-0">
        <ResponsivityFallback />
      </div>
      <div className="md:visible invisible h-screen flex flex-col">
        <Header />
        <div className="px-6 flex-1">
          <ToasterProvider>
            <Outlet />
            <Toaster className="absolute bottom-8 left-8" />
          </ToasterProvider>
        </div>
      </div>
    </div>
  );
}
