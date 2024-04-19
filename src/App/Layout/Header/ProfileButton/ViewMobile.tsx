import { useState } from "react";

import { useStackFeedback } from "src/App/Stacks/Stacks";
import { Fields } from "src/_pages/Rewards/UserRewardTable/Headers";
import MeApi from "src/api/me";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import { useSidePanel } from "src/hooks/useSidePanel";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";

import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TUseMenu } from "hooks/menu/use-menu/use-menu.types";

import { useLogout } from "./Logout.hooks";

interface Props extends TUseMenu.Return {
  avatarUrl: string | null;
  login: string;
  githubUserId?: number;
  hideProfileItems?: boolean;
}

export function ViewMobile({
  avatarUrl,
  login,
  githubUserId,
  hideProfileItems,
  labelToken,
  redirection,
  errorColor,
  error,
}: Props) {
  const { T } = useIntl();
  const [panelOpen, setPanelOpen] = useState(false);
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();
  const { handleLogout } = useLogout();
  const [openFeedback] = useStackFeedback();

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

  function handleFeedback() {
    setPanelOpen(false);
    openFeedback();
  }

  return (
    <>
      <button
        onClick={() => setPanelOpen(true)}
        className={cn(
          "flex items-center justify-center gap-2 rounded-full border border-greyscale-50/12 p-1.5 font-walsheim text-sm",
          {
            "border-orange-500": errorColor === TUseMenu.ERROR_COLORS.WARNING,
            "border-github-red": errorColor === TUseMenu.ERROR_COLORS.ERROR,
          }
        )}
      >
        {avatarUrl && <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={login} />}
        {error && (
          <ErrorWarningLine
            className={cn("text-xl text-spaceBlue-200", {
              "text-orange-500": errorColor === TUseMenu.ERROR_COLORS.WARNING,
              "text-github-red": errorColor === TUseMenu.ERROR_COLORS.ERROR,
            })}
          />
        )}
      </button>

      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <div className="flex flex-col bg-whiteFakeOpacity-5 p-3 font-walsheim text-sm">
          {!hideProfileItems && (
            <>
              <div>
                <BaseLink
                  href={redirection}
                  onClick={() => setPanelOpen(false)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-4"
                >
                  {avatarUrl ? (
                    <img className="h-7 w-7 rounded-full" src={avatarUrl} loading="lazy" alt={login} />
                  ) : null}

                  <Flex direction="col" alignItems="start" className="gap-px">
                    <Typography variant="title-s" className="text-sm leading-4">
                      {login}
                    </Typography>

                    <Typography
                      variant="body-m"
                      translate={{
                        token: labelToken,
                      }}
                      className={cn("text-spaceBlue-200", {
                        "text-orange-500": errorColor === TUseMenu.ERROR_COLORS.WARNING,
                        "text-github-red": errorColor === TUseMenu.ERROR_COLORS.ERROR,
                      })}
                    />
                  </Flex>
                </BaseLink>

                <span className="my-1 block h-px bg-greyscale-50/8" />
              </div>

              {githubUserId || hasRewards ? (
                <div>
                  <BaseLink
                    href={NEXT_ROUTER.projects.all}
                    onClick={() => setPanelOpen(false)}
                    className={cn("flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8")}
                  >
                    <Icon remixName="ri-folder-3-line" size={20} />
                    {T("v2.features.menu.projects")}
                  </BaseLink>

                  {githubUserId ? (
                    <BaseLink
                      href={NEXT_ROUTER.contributions.all}
                      onClick={() => setPanelOpen(false)}
                      className={cn("flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8")}
                    >
                      <Icon remixName="ri-stack-line" size={20} />
                      {T("v2.features.menu.contributions")}
                    </BaseLink>
                  ) : null}

                  <BaseLink
                    href={NEXT_ROUTER.rewards.all}
                    onClick={() => setPanelOpen(false)}
                    className={cn("flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8")}
                  >
                    <Icon remixName="ri-exchange-dollar-line" size={20} />
                    {T("v2.features.menu.rewards")}
                  </BaseLink>

                  <BaseLink
                    href={NEXT_ROUTER.hackathons.root}
                    onClick={() => setPanelOpen(false)}
                    className={cn("flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8")}
                  >
                    <Icon remixName="ri-medal-line" size={20} />
                    {T("v2.features.menu.hackathons")}
                  </BaseLink>

                  <span className="my-1 block h-px bg-greyscale-50/8" />
                </div>
              ) : null}
            </>
          )}

          <div>
            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={handleFeedback}>
              <Icon remixName="ri-discuss-line" size={20} />
              {T("v2.features.menu.feedback")}
            </button>

            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openFullTermsAndConditions}>
              <Icon remixName="ri-bill-line" size={20} />
              {T("v2.features.menu.terms")}
            </button>

            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openPrivacyPolicy}>
              <Icon remixName="ri-lock-line" size={20} />
              {T("v2.features.menu.privacy")}
            </button>

            <span className="my-1 block h-px bg-greyscale-50/8" />
          </div>

          <div>
            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={handleLogout}>
              <Icon remixName="ri-logout-box-r-line" size={20} />
              {T("v2.features.menu.logout")}
            </button>
          </div>
        </div>
      </SidePanel>
    </>
  );
}
