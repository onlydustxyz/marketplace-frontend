import { ReactNode } from "react";
import underline from "assets/img/underline.png";
import { Link } from "react-router-dom";
import classNames from "classnames";

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
      className={classNames(
        "pb-0.5 flex justify-center align-center drop-shadow-lg saturate-200 outline-4 text-base relative",
        {
          "text-white font-bold": active,
          "text-greyscale-500": !active,
        }
      )}
    >
      <div className="bg-black py-1">
        <Link to={link}>{children}</Link>
      </div>
      {active && <img className="absolute inset-x-0 bottom-0 mt-1 h-0.5 w-full" src={underline} alt="underline" />}
    </div>
  );
}
