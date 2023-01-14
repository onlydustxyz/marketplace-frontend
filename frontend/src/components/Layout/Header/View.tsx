import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import MenuItem from "src/components/Layout/Header/MenuItem";
import { generatePath } from "react-router-dom";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]?: string;
    [RoutePaths.MyProjectDetails]?: string;
    [RoutePaths.MyContributions]?: string;
  };
  selectedMenuItem: string;
  isLoggedIn: boolean;
  lastVisitedProjectId: string;
}

export default function HeaderView({ menuItems, selectedMenuItem, isLoggedIn, lastVisitedProjectId }: HeaderViewProps) {
  return (
    <div className="bg-black font-walsheim">
      <div className="flex flex-row justify-start items-center p-4 gap-3 text-xl text-neutral-400">
        <OnlyDustLogo />
        <OnlyDustTitle />
        {Object.keys(menuItems).includes(RoutePaths.Projects) && (
          <MenuItem path={selectedMenuItem} link={RoutePaths.Projects} activeRegex={new RegExp("^(/|/projects.+)$")}>
            {menuItems[RoutePaths.Projects]}
          </MenuItem>
        )}
        {Object.keys(menuItems).includes(RoutePaths.MyProjectDetails) && lastVisitedProjectId && (
          <MenuItem
            path={selectedMenuItem}
            link={generatePath(RoutePaths.MyProjectDetails, { projectId: lastVisitedProjectId })}
          >
            {menuItems[RoutePaths.MyProjectDetails]}
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
