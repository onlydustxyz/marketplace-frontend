import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import MenuItem from "src/components/Layout/Header/MenuItem";
import { Link } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";
import classNames from "classnames";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]?: string;
    [RoutePaths.Payments]?: string;
  };
  selectedMenuItem: string;
  isLoggedIn: boolean;
  onLogin?: () => void;
}

export default function HeaderView({ menuItems, selectedMenuItem, isLoggedIn, onLogin }: HeaderViewProps) {
  const testing = import.meta.env.NODE_ENV === "test";
  return (
    <div className={classNames("bg-black", "py-4 px-6 gap-3 xl:gap-8", "font-walsheim text-xl text-neutral-400")}>
      <div className="flex gap-8 justify-center xl:justify-start items-center">
        <Link to={RoutePaths.Projects} className="flex items-center w-fit gap-3 ">
          <OnlyDustLogo />
          <OnlyDustTitle />
        </Link>
        <div className="hidden flex-1 xl:flex gap-8 items-center">
          {menuItems[RoutePaths.Projects] && (
            <MenuItem path={selectedMenuItem} link={RoutePaths.Projects} activeRegex={new RegExp("^(/|/projects.+)$")}>
              {menuItems[RoutePaths.Projects]}
            </MenuItem>
          )}
          {menuItems[RoutePaths.Payments] && (
            <MenuItem path={selectedMenuItem} link={RoutePaths.Payments}>
              {menuItems[RoutePaths.Payments]}
            </MenuItem>
          )}
          <div className="flex flex-1 flex-row gap-4 justify-end">
            {isLoggedIn && !testing && <FeedbackButton />}
            <div className="flex text-base text-white">
              {!isLoggedIn ? <GithubLink onClick={onLogin} /> : <ProfileButton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
