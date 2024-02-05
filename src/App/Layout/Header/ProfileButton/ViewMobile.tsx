import { useState } from "react";
import { NavLink } from "react-router-dom";

import { RoutePaths } from "src/App";
import { useStackVerify } from "src/App/Stacks/Stacks";
import { Fields } from "src/_pages/Rewards/UserRewardTable/Headers";
import MeApi from "src/api/me";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import { useSidePanel } from "src/hooks/useSidePanel";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useLogout } from "./Logout.hooks";

interface Props {
  avatarUrl: string | null;
  login: string;
  isMissingPayoutSettingsInfo: boolean;
  githubUserId?: number;
  hideProfileItems?: boolean;
  openFeedback: () => void;
}

export function ViewMobile({
  avatarUrl,
  login,
  isMissingPayoutSettingsInfo,
  githubUserId,
  hideProfileItems,
  openFeedback,
}: Props) {
  const { T } = useIntl();

  const [panelOpen, setPanelOpen] = useState(false);
  const [openVerify] = useStackVerify();
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

  const { handleLogout } = useLogout();

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

  const getProfileButtonLink = () => {
    if (isMissingPayoutSettingsInfo) {
      return NEXT_ROUTER.settings.payout;
    }

    return NEXT_ROUTER.settings.profile;
  };

  return (
    <>
      <button
        onClick={() => setPanelOpen(true)}
        className={cn("flex items-center justify-center gap-2 rounded-full border px-2 py-1.5 font-walsheim text-sm", {
          "border-greyscale-50/12": !isMissingPayoutSettingsInfo,
          "border-orange-500": isMissingPayoutSettingsInfo,
        })}
      >
        {avatarUrl && <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={T("profile.avatar")} />}
        {isMissingPayoutSettingsInfo && <ErrorWarningLine className="text-xl text-orange-500" />}
      </button>

      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <div className="flex flex-col bg-whiteFakeOpacity-5 p-3 font-walsheim text-sm">
          {!hideProfileItems && (
            <>
              <div>
                <NavLink
                  to={getProfileButtonLink()}
                  onClick={() => setPanelOpen(false)}
                  className="flex w-full items-center gap-1 rounded-md px-3 py-4"
                >
                  {avatarUrl ? (
                    <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={T("profile.avatar")} />
                  ) : null}

                  <Flex direction="col" alignItems="start">
                    <Typography variant="title-s" className="text-sm leading-4">
                      {login}
                    </Typography>

                    <Typography
                      variant="body-s"
                      translate={{
                        token: isMissingPayoutSettingsInfo
                          ? "navbar.profile.missingPayoutInformation"
                          : "navbar.profile.manage",
                      }}
                      className={cn({
                        "text-spaceBlue-200": !isMissingPayoutSettingsInfo,
                        "text-orange-500": isMissingPayoutSettingsInfo,
                      })}
                    />
                  </Flex>
                </NavLink>

                <span className="my-1 block h-px bg-greyscale-50/8" />
              </div>

              {githubUserId || hasRewards ? (
                <div>
                  <NavLink
                    to={RoutePaths.Projects}
                    onClick={() => setPanelOpen(false)}
                    className={({ isActive }) =>
                      cn("flex items-center gap-3 rounded-md p-4", { "bg-white/8": isActive })
                    }
                  >
                    <Icon remixName="ri-folder-3-line" size={20} />
                    {T("navbar.projects")}
                  </NavLink>

                  {githubUserId ? (
                    <NavLink
                      to={RoutePaths.Contributions}
                      onClick={() => setPanelOpen(false)}
                      className={({ isActive }) =>
                        cn("flex items-center gap-3 rounded-md p-4", { "bg-white/8": isActive })
                      }
                    >
                      <Icon remixName="ri-stack-line" size={20} />
                      {T("navbar.contributions")}
                    </NavLink>
                  ) : null}

                  {hasRewards ? (
                    <NavLink
                      to={RoutePaths.Rewards}
                      onClick={() => setPanelOpen(false)}
                      className={({ isActive }) =>
                        cn("flex items-center gap-3 rounded-md p-4", { "bg-white/8": isActive })
                      }
                    >
                      <Icon remixName="ri-exchange-dollar-line" size={20} />
                      {T("navbar.rewards")}
                    </NavLink>
                  ) : null}

                  <span className="my-1 block h-px bg-greyscale-50/8" />
                </div>
              ) : null}

              <div>
                {process.env.NEXT_PUBLIC_IS_ALLOWED_SUMSUB === "true" ? (
                  <>
                    <button
                      className="flex items-center gap-3 p-4"
                      onClick={() => {
                        setPanelOpen(false);
                        openVerify({ levelName: "basic-kyc-level" });
                      }}
                    >
                      <Icon remixName="ri-pass-valid-line" size={20} />
                      {T("navbar.profile.verifyIdentity")}
                    </button>

                    <button
                      className="flex items-center gap-3 p-4"
                      onClick={() => {
                        setPanelOpen(false);
                        openVerify({ levelName: "basic-kyb-level" });
                      }}
                    >
                      <Icon remixName="ri-pass-valid-line" size={20} />
                      {T("navbar.profile.verifyCompany")}
                    </button>

                    <span className="mx-4 my-1 block h-px bg-greyscale-50/8" />
                  </>
                ) : null}
              </div>
            </>
          )}

          <div>
            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openFeedback}>
              <Icon remixName="ri-discuss-line" size={20} />
              {T("navbar.feedback.button")}
            </button>

            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openFullTermsAndConditions}>
              <Icon remixName="ri-bill-line" size={20} />
              {T("navbar.termsAndConditions")}
            </button>

            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openPrivacyPolicy}>
              <Icon remixName="ri-lock-line" size={20} />
              {T("navbar.privacyPolicy")}
            </button>

            <span className="my-1 block h-px bg-greyscale-50/8" />
          </div>

          <div>
            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={handleLogout}>
              <Icon remixName="ri-logout-box-r-line" size={20} />
              {T("navbar.logout")}
            </button>
          </div>
        </div>
      </SidePanel>
    </>
  );
}
