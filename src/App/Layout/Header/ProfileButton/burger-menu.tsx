import { useState } from "react";
import { useSponsorGuard } from "utils/guards/sponsor-guard.hooks";

import { useOnboarding } from "src/App/OnboardingProvider";
import { useStackFeedback } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import SidePanel from "src/components/SidePanel";
import { useSidePanel } from "src/hooks/useSidePanel";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useMenu } from "hooks/menu/use-menu/use-menu";
import { TUseMenu } from "hooks/menu/use-menu/use-menu.types";

import { useLogout } from "./Logout.hooks";

export function BurgerMenu() {
  const { labelToken, redirection, errorColor } = useMenu();
  const { data: userInfo } = MeApi.queries.useGetMe({});

  const { githubUserId, login = "", avatarUrl = "" } = userInfo || {};

  const { onboardingInProgress } = useOnboarding();

  const props = {
    hideProfileItems: onboardingInProgress,
  };

  const [panelOpen, setPanelOpen] = useState(false);
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();
  const { handleLogout } = useLogout();
  const [openFeedback] = useStackFeedback();
  const { sponsors } = useSponsorGuard();
  function handleFeedback() {
    setPanelOpen(false);
    openFeedback();
  }

  return (
    <>
      <Button onClick={() => setPanelOpen(true)} iconOnly size={"s"} variant={"secondary"} className="flex xl:hidden">
        <Icon remixName="ri-menu-line" size={18} />
      </Button>

      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <div className="flex flex-col divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5 p-3 font-walsheim text-sm">
          {!props.hideProfileItems && (
            <>
              {githubUserId || sponsors.length ? (
                <div>
                  {githubUserId ? (
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
                  ) : null}

                  {sponsors.length ? (
                    <BaseLink
                      href={NEXT_ROUTER.sponsor.details.root(sponsors[0].id)}
                      onClick={() => setPanelOpen(false)}
                      className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                    >
                      <Icon remixName="ri-service-line" size={20} />
                      <Translate token="v2.features.menu.sponsoring" />
                    </BaseLink>
                  ) : null}
                </div>
              ) : null}

              <div>
                <BaseLink
                  href={NEXT_ROUTER.home.all}
                  onClick={() => setPanelOpen(false)}
                  className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                >
                  <Icon remixName="ri-home-2-line" size={20} />
                  <Translate token="v2.features.menu.home" />
                </BaseLink>

                <BaseLink
                  href={NEXT_ROUTER.projects.all}
                  onClick={() => setPanelOpen(false)}
                  className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                >
                  <Icon remixName="ri-folder-3-line" size={20} />
                  <Translate token="v2.features.menu.projects" />
                </BaseLink>

                <BaseLink
                  href={NEXT_ROUTER.ecosystems.root}
                  onClick={() => setPanelOpen(false)}
                  className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                >
                  <Icon remixName="ri-global-line" size={20} />
                  <Translate token="v2.features.menu.ecosystems" />
                </BaseLink>

                <BaseLink
                  href={NEXT_ROUTER.hackathons.root}
                  onClick={() => setPanelOpen(false)}
                  className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                >
                  <Icon remixName="ri-medal-line" size={20} />
                  <Translate token="v2.features.menu.hackathons" />
                </BaseLink>

                {githubUserId ? (
                  <BaseLink
                    href={NEXT_ROUTER.contributions.all}
                    onClick={() => setPanelOpen(false)}
                    className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                  >
                    <Icon remixName="ri-stack-line" size={20} />
                    <Translate token="v2.features.menu.contributions" />
                  </BaseLink>
                ) : null}

                {githubUserId ? (
                  <BaseLink
                    href={NEXT_ROUTER.applications.all}
                    onClick={() => setPanelOpen(false)}
                    className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                  >
                    <div className={"h-5 w-5 rounded-full border-2 border-dashed"} />
                    <Translate token="v2.features.menu.applications" />
                  </BaseLink>
                ) : null}

                {githubUserId ? (
                  <BaseLink
                    href={NEXT_ROUTER.rewards.all}
                    onClick={() => setPanelOpen(false)}
                    className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
                  >
                    <Icon remixName="ri-exchange-dollar-line" size={20} />
                    <Translate token="v2.features.menu.rewards" />
                  </BaseLink>
                ) : null}
              </div>
            </>
          )}

          <div>
            {login ? (
              <BaseLink
                href={NEXT_ROUTER.publicProfile.root(login)}
                onClick={() => setPanelOpen(false)}
                className="flex items-center gap-3 rounded-md p-4 data-[active=true]:bg-white/8"
              >
                <Icon remixName="ri-user-line" size={20} />
                <Translate token="v2.features.menu.publicProfile" />
              </BaseLink>
            ) : null}

            {githubUserId ? (
              <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={handleFeedback}>
                <Icon remixName="ri-discuss-line" size={20} />
                <Translate token="v2.features.menu.feedback" />
              </button>
            ) : null}

            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openFullTermsAndConditions}>
              <Icon remixName="ri-bill-line" size={20} />
              <Translate token="v2.features.menu.terms" />
            </button>

            <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={openPrivacyPolicy}>
              <Icon remixName="ri-lock-line" size={20} />
              <Translate token="v2.features.menu.privacy" />
            </button>
          </div>

          {githubUserId ? (
            <div>
              <button className="flex w-full items-center gap-3 rounded-md p-4" onClick={handleLogout}>
                <Icon remixName="ri-logout-box-r-line" size={20} />
                <Translate token="v2.features.menu.logout" />
              </button>
            </div>
          ) : null}
        </div>
      </SidePanel>
    </>
  );
}
