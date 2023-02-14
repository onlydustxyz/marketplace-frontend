import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import MenuItem from "src/components/Layout/Header/MenuItem";
import { generatePath, Link } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]?: string;
    [RoutePaths.MyProjectDetails__deprecated]?: string;
    [RoutePaths.MyContributions]?: string;
  };
  selectedMenuItem: string;
  isLoggedIn: boolean;
  lastVisitedProjectId: string;
  onLogin?: () => void;
}

export default function HeaderView({
  menuItems,
  selectedMenuItem,
  isLoggedIn,
  lastVisitedProjectId,
  onLogin,
}: HeaderViewProps) {
  const testing = import.meta.env.NODE_ENV === "test";
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
      {menuItems[RoutePaths.MyProjectDetails__deprecated] && lastVisitedProjectId && (
        <MenuItem
          path={selectedMenuItem}
          link={generatePath(RoutePaths.MyProjectDetails__deprecated, { projectId: lastVisitedProjectId })}
        >
          {menuItems[RoutePaths.MyProjectDetails__deprecated]}
        </MenuItem>
      )}
      {menuItems[RoutePaths.MyContributions] && (
        <MenuItem path={selectedMenuItem} link={RoutePaths.MyContributions}>
          {menuItems[RoutePaths.MyContributions]}
        </MenuItem>
      )}
      <div className="flex flex-1 flex-row gap-4 justify-end">
        {isLoggedIn && !testing && <FeedbackButton />}
        <div className="flex text-base text-white">
          {!isLoggedIn ? <GithubLink onClick={onLogin} /> : <ProfileButton />}
        </div>
      </div>
    </div>
  );
}
