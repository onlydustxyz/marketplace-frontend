import { ReactNode } from "react";
import underline from "assets/img/underline.png";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface MenuItemProps {
  path: string;
  children: ReactNode;
  link: string;
  state?: unknown;
  activeRegex?: RegExp;
}
export default function MenuItem({ path, link, state, children, activeRegex }: MenuItemProps) {
  const active = (activeRegex || new RegExp(`^${link}.*`)).test(path);
  return (
    <div
      className={classNames(
        "align-center relative flex justify-center pb-0.5 text-base outline-4 drop-shadow-lg saturate-200",
        {
          "font-bold text-white": active,
          "text-greyscale-500": !active,
        }
      )}
    >
      <div className="bg-black py-1">
        <Link to={link} state={state}>
          {children}
        </Link>
      </div>
      {active && <img className="absolute inset-x-0 bottom-0 mt-1 h-0.5 w-full" src={underline} alt="underline" />}
    </div>
  );
}
