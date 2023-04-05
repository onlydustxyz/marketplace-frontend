import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import MenuItem from "src/App/Layout/Header/MenuItem";
import { Link } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";
import classNames from "classnames";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useIntl } from "src/hooks/useIntl";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]?: string;
    [RoutePaths.Payments]?: string;
  };
  selectedMenuItem: string;
  isLoggedIn: boolean;
  onLogin?: () => void;
  impersonating?: boolean;
}

export default function HeaderView({
  menuItems,
  selectedMenuItem,
  isLoggedIn,
  onLogin,
  impersonating = false,
}: HeaderViewProps) {
  const testing = import.meta.env.NODE_ENV === "test";
  const { T } = useIntl();

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
          <div className="flex-1 flex justify-center">
            {impersonating && (
              <div className="bg-orange-500 text-white text-sm uppercase font-bold px-4 py-2 rounded-xl">
                {T("impersonation.banner")}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-4 justify-end">
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
