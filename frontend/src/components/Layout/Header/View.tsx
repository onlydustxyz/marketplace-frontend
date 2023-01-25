import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import MenuItem from "src/components/Layout/Header/MenuItem";
import { generatePath, Link } from "react-router-dom";

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
    <div className="bg-black font-walsheim flex flex-row justify-start items-center py-4 px-6 gap-8 text-xl text-neutral-400">
      <Link to={RoutePaths.Projects} className="flex items-center w-fit gap-3 ">
        <OnlyDustLogo />
        <OnlyDustTitle />
      </Link>
      {menuItems[RoutePaths.Projects] && (
        <MenuItem path={selectedMenuItem} link={RoutePaths.Projects} activeRegex={new RegExp("^(/|/projects.+)$")}>
          {menuItems[RoutePaths.Projects]}
        </MenuItem>
      )}
      {menuItems[RoutePaths.MyProjectDetails] && lastVisitedProjectId && (
        <MenuItem
          path={selectedMenuItem}
          link={generatePath(RoutePaths.MyProjectDetails, { projectId: lastVisitedProjectId })}
        >
          {menuItems[RoutePaths.MyProjectDetails]}
        </MenuItem>
      )}
      {menuItems[RoutePaths.MyContributions] && (
        <MenuItem path={selectedMenuItem} link={RoutePaths.MyContributions}>
          {menuItems[RoutePaths.MyContributions]}
        </MenuItem>
      )}
      <div className="flex flex-1 text-base text-white justify-end">
        {!isLoggedIn ? <GithubLink /> : <ProfileButton />}
      </div>
    </div>
  );
}
