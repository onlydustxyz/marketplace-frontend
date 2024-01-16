import { RoutePaths } from "src/App";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import MenuItem from "src/App/Layout/Header/MenuItem";
import { Link } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";
import { useIntl } from "src/hooks/useIntl";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { GithubStatusBanner } from "./GithubStatusBanner";
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileButtonDisplay } from "./ProfileButton/ProfileButtonDisplay";

interface HeaderViewProps {
  menuItems: {
    [RoutePaths.Projects]?: string;
    [RoutePaths.Contributions]?: string;
    [RoutePaths.Rewards]?: string;
  };
  selectedMenuItem: string;
  impersonating?: boolean;
  profileCompletionScore?: number;
}

export default function HeaderView({ menuItems, selectedMenuItem, impersonating = false }: HeaderViewProps) {
  const testing = process.env.NODE_ENV === "test";
  const { T } = useIntl();
  const { isAuthenticated, isLoading } = useAuth0();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  return (
    <>
      <div className="gap-3 bg-black px-6 py-4 font-walsheim text-xl text-neutral-400 xl:gap-8" data-testid="header">
        <div className="flex items-center justify-center gap-8 xl:justify-start">
          <Link to={RoutePaths.Projects} className="flex w-fit items-center gap-3 ">
            <OnlyDustLogo />
            <OnlyDustTitle />
          </Link>

          <div className="flex-1 items-center gap-8 xl:flex">
            {isXl && (
              <>
                {menuItems[RoutePaths.Projects] ? (
                  <MenuItem
                    path={selectedMenuItem}
                    link={RoutePaths.Projects}
                    state={{ skipScrollRestoration: true }}
                    activeRegex={new RegExp("^(/|/projects.+)$")}
                  >
                    {menuItems[RoutePaths.Projects]}
                  </MenuItem>
                ) : null}
                {menuItems[RoutePaths.Contributions] ? (
                  <MenuItem path={selectedMenuItem} link={RoutePaths.Contributions}>
                    {menuItems[RoutePaths.Contributions]}
                  </MenuItem>
                ) : null}
                {menuItems[RoutePaths.Rewards] ? (
                  <MenuItem path={selectedMenuItem} link={RoutePaths.Rewards}>
                    {menuItems[RoutePaths.Rewards]}
                  </MenuItem>
                ) : null}
                <div className="flex flex-1 justify-center">
                  {impersonating ? (
                    <div
                      className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold uppercase text-white"
                      data-testid="impersonation-banner"
                    >
                      {T("impersonation.banner")}
                    </div>
                  ) : null}
                </div>
              </>
            )}
            <div className="flex flex-row items-center justify-end gap-4">
              {isXl && isAuthenticated && !testing ? <FeedbackButton /> : null}
              <ProfileButtonDisplay isLoading={isLoading} isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>
      </div>

      <GithubStatusBanner />
    </>
  );
}
