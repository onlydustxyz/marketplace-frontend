import { cn } from "src/utils/cn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RoutePaths } from "src/App";
import Dot from "src/assets/icons/Dot";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import { useSidePanel } from "src/hooks/useSidePanel";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import ExchangeDollarLine from "src/icons/ExchangeDollarLine";
import Folder3Line from "src/icons/Folder3Line";
import LogoutBoxRLine from "src/icons/LogoutBoxRLine";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import StackLine from "src/icons/StackLine";
import User3Line from "src/icons/User3Line";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import { Fields } from "src/_pages/Rewards/UserRewardTable/Headers";
import MeApi from "src/api/me";
import { useStackContributorProfile, useStackPayoutInfo } from "src/App/Stacks/Stacks";
import { useAuth0 } from "@auth0/auth0-react";
import handleLogout from "../../../../../components/features/auth0/handlers/handle-logout.ts";
import { useImpersonation } from "components/features/impersonation/use-impersonation.tsx";

type Props = {
  avatarUrl: string | null;
  login: string;
  isMissingPayoutSettingsInfo: boolean;
  githubUserId?: number;
  hideProfileItems?: boolean;
};

export default function ViewMobile({ avatarUrl, isMissingPayoutSettingsInfo, githubUserId, hideProfileItems }: Props) {
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
        <div className="flex flex-col divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5 p-3 font-walsheim text-sm">
          {!hideProfileItems && (
            <>
              {githubUserId || hasRewards ? (
                <>
                  <NavLink
                    to={RoutePaths.Projects}
                    onClick={() => setPanelOpen(false)}
                    className={({ isActive }) =>
                      cn("flex items-center gap-3 rounded-xl p-4", { "bg-white/8": isActive })
                    }
                  >
                    <Folder3Line className="text-xl" /> {T("navbar.projects")}
                  </NavLink>

                  {githubUserId ? (
                    <NavLink
                      to={RoutePaths.Contributions}
                      onClick={() => setPanelOpen(false)}
                      className={({ isActive }) =>
                        cn("flex items-center gap-3 rounded-xl p-4", { "bg-white/8": isActive })
                      }
                    >
                      <StackLine className="text-xl" /> {T("navbar.contributions")}
                    </NavLink>
                  ) : null}

                  {hasRewards ? (
                    <NavLink
                      to={RoutePaths.Rewards}
                      onClick={() => setPanelOpen(false)}
                      className={({ isActive }) =>
                        cn("flex items-center gap-3 rounded-xl p-4", { "bg-white/8": isActive })
                      }
                    >
                      <ExchangeDollarLine className="text-xl" /> {T("navbar.rewards")}
                    </NavLink>
                  ) : null}
                </>
              ) : null}

              <>
                {githubUserId && (
                  <button
                    className="flex items-center gap-3 p-4"
                    onClick={() => {
                      setPanelOpen(false);
                      openContributorProfilePanel({ githubUserId });
                    }}
                  >
                    <User3Line className="text-xl" /> {T("navbar.profile.publicProfile")}
                  </button>
                )}
                <button
                  className="flex items-center gap-3 p-4"
                  onClick={() => {
                    setPanelOpen(false);
                    openPayoutInfo();
                  }}
                >
                  <MoneyDollarCircleLine className="text-xl" /> {T("navbar.profile.payoutInfo")}
                  {isMissingPayoutSettingsInfo && <Dot className="w-1.5 fill-orange-500" />}
                </button>
              </>
            </>
          )}
          <div className="flex w-full flex-row items-center justify-between p-4">
            <div className="flex flex-row gap-1 text-xs font-normal text-spaceBlue-200">
              <button onClick={openFullTermsAndConditions}>{T("navbar.termsAndConditions")}</button>
              <div>{T("navbar.separator")}</div>
              <button onClick={openPrivacyPolicy}>{T("navbar.privacyPolicy")}</button>
            </div>
            <Button
              type={ButtonType.Secondary}
              size={ButtonSize.Xs}
              onClick={handleLogoutClick}
              data-testid="logout-button"
            >
              <LogoutBoxRLine className="border-greyscale-50 text-sm" />
              {T("navbar.logout")}
            </Button>
          </div>
        </div>
      </SidePanel>
    </>
  );
}
