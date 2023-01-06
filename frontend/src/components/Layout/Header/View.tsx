import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import MenuItem from "src/components/Layout/Header/MenuItem";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]?: string;
    [RoutePaths.MyProjects]?: string;
    [RoutePaths.MyContributions]?: string;
  };
  selectedMenuItem: string;
  isLoggedIn: boolean;
}

export default function HeaderView({ menuItems, selectedMenuItem, isLoggedIn }: HeaderViewProps) {
  return (
    <div className="bg-black font-walsheim">
      <div className="flex flex-row justify-start items-center px-5 py-5 gap-5 text-xl text-neutral-400">
        <OnlyDustLogo />
        <OnlyDustTitle />
        {Object.keys(menuItems).includes(RoutePaths.Projects) && (
          <MenuItem path={selectedMenuItem} link={RoutePaths.Projects} activeRegex={new RegExp("^(/|/projects.+)$")}>
            {menuItems[RoutePaths.Projects]}
          </MenuItem>
        )}
        {Object.keys(menuItems).includes(RoutePaths.MyProjects) && (
          <MenuItem path={selectedMenuItem} link={RoutePaths.MyProjects}>
            {menuItems[RoutePaths.MyProjects]}
          </MenuItem>
        )}
        {Object.keys(menuItems).includes(RoutePaths.MyContributions) && (
          <MenuItem path={selectedMenuItem} link={RoutePaths.MyContributions}>
            {menuItems[RoutePaths.MyContributions]}
          </MenuItem>
        )}
        <div className="flex flex-1 justify-end">{!isLoggedIn ? <GithubLink /> : <ProfileButton />}</div>
      </div>
    </div>
  );
}
