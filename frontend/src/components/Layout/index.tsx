import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="container mx-auto pb-10">
        <Outlet />
      </div>
    </div>
  );
}
