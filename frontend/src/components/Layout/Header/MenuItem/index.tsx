import { ReactNode } from "react";
import headerElementBackground from "assets/img/header-element-background.png";
import { Link } from "react-router-dom";

interface MenuItemProps {
  path: string;
  children: ReactNode;
  link: string;
  activeRegex?: RegExp;
}
export default function MenuItem({ path, link, children, activeRegex }: MenuItemProps) {
  const active = (activeRegex || new RegExp(`^${link}.*`)).test(path);
  return (
    <div
      className={`pb-0.5 flex justify-center align-center drop-shadow-lg saturate-200 outline-4 ${
        active ? "text-white" : ""
      }`}
      style={active ? { backgroundImage: `url(${headerElementBackground})` } : {}}
    >
      <div className="bg-black py-1">
        <Link to={link}>{children}</Link>
      </div>
    </div>
  );
}
