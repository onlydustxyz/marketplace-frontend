import { cn } from "src/utils/cn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RoutePaths } from "src/App";
import Dot from "src/assets/icons/Dot";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import { useSidePanel } from "src/hooks/useSidePanel";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import { Fields } from "src/_pages/Rewards/UserRewardTable/Headers";
import MeApi from "src/api/me";
import { useStackContributorProfile, useStackPayoutInfo } from "src/App/Stacks/Stacks";
import { useAuth0 } from "@auth0/auth0-react";
import { handleLogout } from "components/features/auth0/handlers/handle-logout";
import { useImpersonation } from "components/features/impersonation/use-impersonation";
import { Icon } from "components/layout/icon/icon";

interface Props {
  avatarUrl: string | null;
  login: string;
  isMissingPayoutSettingsInfo: boolean;
  githubUserId?: number;
  hideProfileItems?: boolean;
}

export function ViewMobile({ avatarUrl, isMissingPayoutSettingsInfo, githubUserId, hideProfileItems }: Props) {
  const { T } = useIntl();
  const { logout } = useAuth0();
  const { isImpersonating, clearImpersonateClaim } = useImpersonation();

  const [panelOpen, setPanelOpen] = useState(false);
  const [openContributorProfilePanel] = useStackContributorProfile();
  const [openPayoutInfo] = useStackPayoutInfo();
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

  const { queryParams } = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "myRewardsSorting",
  });

  const { data, isLoading, isError } = MeApi.queries.useMyRewardsInfiniteList({
    queryParams,
  });

  const rewards = data?.pages.flatMap(({ rewards }) => rewards) ?? [];
  const hasRewards = rewards.length && !isLoading && !isError;

  const handleLogoutClick = () => {
    handleLogout(logout, isImpersonating, clearImpersonateClaim);
  };

  return (
    <>
      <button
        onClick={() => setPanelOpen(true)}
        className={cn(
          "border-1 flex items-center justify-center gap-2 rounded-full border px-2 py-1.5 font-walsheim text-sm",
          {
            "border-greyscale-50/12": !isMissingPayoutSettingsInfo,
            "border-orange-500": isMissingPayoutSettingsInfo,
          }
        )}
      >
        {avatarUrl && <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={T("profile.avatar")} />}
        {isMissingPayoutSettingsInfo && <ErrorWarningLine className="text-xl text-orange-500" />}
      </button>

      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <div className="flex flex-col bg-whiteFakeOpacity-5 p-3 font-walsheim text-sm">
          {!hideProfileItems && (
            <>
              {githubUserId || hasRewards ? (
                <div>
                  <NavLink
                    to={RoutePaths.Projects}
                    onClick={() => setPanelOpen(false)}
                    className={({ isActive }) =>
                      cn("flex items-center gap-3 rounded-xl p-4", { "bg-white/8": isActive })
                    }
                  >
                    <Icon remixName="ri-folder-3-line" size={20} />
                    {T("navbar.projects")}
                  </NavLink>

                  {githubUserId ? (
                    <NavLink
                      to={RoutePaths.Contributions}
                      onClick={() => setPanelOpen(false)}
                      className={({ isActive }) => cn("flex items-center gap-3  p-4", { "bg-white/8": isActive })}
                    >
                      <Icon remixName="ri-stack-line" size={20} />
                      {T("navbar.contributions")}
                    </NavLink>
                  ) : null}

                  {hasRewards ? (
                    <NavLink
                      to={RoutePaths.Rewards}
                      onClick={() => setPanelOpen(false)}
                      className={({ isActive }) => cn("flex items-center gap-3  p-4", { "bg-white/8": isActive })}
                    >
                      <Icon remixName="ri-exchange-dollar-line" size={20} />
                      {T("navbar.rewards")}
                    </NavLink>
                  ) : null}

                  <span className="mx-4 my-1 h-px bg-greyscale-50/8" />
                </div>
              ) : null}

              <div>
                {githubUserId ? (
                  <button
                    className="flex items-center gap-3 p-4"
                    onClick={() => {
                      setPanelOpen(false);
                      openContributorProfilePanel({ githubUserId });
                    }}
                  >
                    <Icon remixName="ri-user-3-line" size={20} />
                    {T("navbar.profile.publicProfile")}
                  </button>
                ) : null}

                <button
                  className="flex items-center gap-3 p-4"
                  onClick={() => {
                    setPanelOpen(false);
                    openPayoutInfo();
                  }}
                >
                  <Icon remixName="ri-money-dollar-circle-line" size={20} />
                  {T("navbar.profile.payoutInfo")}
                  {isMissingPayoutSettingsInfo && <Dot className="w-1.5 fill-orange-500" />}
                </button>

                <span className="mx-4 my-1 h-px bg-greyscale-50/8" />
              </div>
            </>
          )}

          <div>
            <button className="flex items-center gap-3 p-4" onClick={openFullTermsAndConditions}>
              <Icon remixName="ri-bill-line" size={20} />
              {T("navbar.termsAndConditions")}
            </button>

            <button className="flex items-center gap-3 p-4" onClick={openPrivacyPolicy}>
              <Icon remixName="ri-lock-line" size={20} />
              {T("navbar.privacyPolicy")}
            </button>

            <span className="mx-4 my-1 h-px bg-greyscale-50/8" />
          </div>

          <div>
            <button className="flex items-center gap-3 p-4">
              <Icon remixName="ri-discuss-line" size={20} />
              {T("navbar.feedback.button")}
            </button>

            <button className="flex items-center gap-3 p-4" onClick={handleLogoutClick}>
              <Icon remixName="ri-logout-box-r-line" size={20} />
              {T("navbar.logout")}
            </button>
          </div>
        </div>
      </SidePanel>
    </>
  );
}
