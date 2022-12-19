import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import GithubLink from "./GithubLink";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import ProfileButton from "./ProfileButton";
import headerElementBackground from "assets/img/header-element-background.png";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]: string;
    [RoutePaths.MyProjects]?: string;
    [RoutePaths.MyContributions]?: string;
  };
  selectedMenuItem: string;
  isLoggedIn: boolean;
}

export default function HeaderView({ menuItems, selectedMenuItem, isLoggedIn }: HeaderViewProps) {
  return (
    <div className="bg-black/50 font-walsheim">
      <div className="flex flex-row justify-start items-center px-5 py-5 gap-5 text-xl text-neutral-400">
        <OnlyDustLogo />
        <OnlyDustTitle />
        <div
          className={`pb-0.5 flex justify-center align-center drop-shadow-lg saturate-200 outline-4 ${
            selectedMenuItem === RoutePaths.Projects ? "text-white" : ""
          }`}
          style={selectedMenuItem === RoutePaths.Projects ? { backgroundImage: `url(${headerElementBackground})` } : {}}
        >
          <div className="bg-black py-1">
            <Link to={RoutePaths.Projects}>{menuItems[RoutePaths.Projects]}</Link>
          </div>
        </div>
        {Object.keys(menuItems).includes(RoutePaths.MyProjects) && (
          <div
            className={`pb-0.5 flex justify-center align-center drop-shadow-lg saturate-200 outline-4 ${
              selectedMenuItem === RoutePaths.MyProjects ? "text-white bg-[${headerElementBackground}]" : ""
            }`}
            style={
              selectedMenuItem === RoutePaths.MyProjects ? { backgroundImage: `url(${headerElementBackground})` } : {}
            }
          >
            <div className="bg-black py-1">
              <Link to={RoutePaths.MyProjects}>{menuItems[RoutePaths.MyProjects]}</Link>
            </div>
          </div>
        )}
        {Object.keys(menuItems).includes(RoutePaths.MyContributions) && (
          <div
            className={`pb-0.5 flex justify-center align-center drop-shadow-lg saturate-200 outline-4  ${
              selectedMenuItem === RoutePaths.MyContributions ? "text-white" : ""
            }`}
            style={
              selectedMenuItem === RoutePaths.MyContributions
                ? { backgroundImage: `url(${headerElementBackground})` }
                : {}
            }
          >
            <div className="bg-black py-1">
              <Link to={RoutePaths.MyContributions}>{menuItems[RoutePaths.MyContributions]}</Link>
            </div>
          </div>
        )}
        <div className="flex flex-1 justify-end">{!isLoggedIn ? <GithubLink /> : <ProfileButton />}</div>
      </div>
    </div>
  );
}
