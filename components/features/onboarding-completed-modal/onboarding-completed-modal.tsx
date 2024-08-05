"use client";

import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import onboardingCompleted from "public/images/onboarding/onboarding-completed.png";
import { FunctionComponent, useEffect, useState } from "react";

import { StepHeader } from "app/(v1)/signup/components/step-header/step-header";
import { Title } from "app/(v1)/signup/components/title/title";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { ApplyGrant } from "components/icons/onboarding/apply-grant";
import { EarnRewards } from "components/icons/onboarding/earn-rewards";
import { ExploreProjects } from "components/icons/onboarding/explore-projects";
import { JoinProject } from "components/icons/onboarding/join-project";
import { ManageContributors } from "components/icons/onboarding/manage-contributors";
import { SubmitProject } from "components/icons/onboarding/submit-project";
import { BaseLink } from "components/layout/base-link/base-link";
import { Modal } from "components/molecules/modal";

import { NEXT_ROUTER } from "constants/router";

import { Key, useIntl } from "hooks/translate/use-translate";

type Card = {
  title: Key;
  content: Key;
  Icon: FunctionComponent<{ className?: string }>;
};

function Card({ title, content, Icon }: Card) {
  const { T } = useIntl();

  return (
    <Paper size={"s"} container={"3"} classNames={{ base: "flex md:flex-col gap-2 content-start items-center" }}>
      <div className="relative">
        <Image
          src={onboardingCompleted}
          alt={T("title")}
          className={
            "flex max-w-24 rounded-lg border border-container-stroke-separator object-cover aspect-square md:max-w-full md:aspect-auto"
          }
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={"w-1/2 lg:w-auto"} />
        </div>
      </div>
      <div className={"grid"}>
        <Typo size={"l"} weight={"medium"} translate={{ token: title }} classNames={{ base: "capitalize" }} />
        <Typo size={"s"} color={"text-2"} translate={{ token: content }} />
      </div>
    </Paper>
  );
}

const ONBOARDING_SEARCH_PARAM = "onboardingCompleted";

const maintainerCards: Card[] = [
  {
    title: "v2.pages.signup.onboarding.completed.sections.submitProject.title",
    content: "v2.pages.signup.onboarding.completed.sections.submitProject.content",
    Icon: SubmitProject,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.manageContributors.title",
    content: "v2.pages.signup.onboarding.completed.sections.manageContributors.content",
    Icon: ManageContributors,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.applyGrant.title",
    content: "v2.pages.signup.onboarding.completed.sections.applyGrant.content",
    Icon: ApplyGrant,
  },
];

const contributorCards: Card[] = [
  {
    title: "v2.pages.signup.onboarding.completed.sections.exploreProjects.title",
    content: "v2.pages.signup.onboarding.completed.sections.exploreProjects.content",
    Icon: ExploreProjects,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.joinProject.title",
    content: "v2.pages.signup.onboarding.completed.sections.joinProject.content",
    Icon: JoinProject,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.earnRewards.title",
    content: "v2.pages.signup.onboarding.completed.sections.earnRewards.content",
    Icon: EarnRewards,
  },
];

export function OnboardingCompletedModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasOnboardingCompletedParam = searchParams.has(ONBOARDING_SEARCH_PARAM);
  const [isOpen, setIsOpen] = useState(false);

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userProfile } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const isMaintainer = userProfile?.isMaintainer() ?? false;
  const cards = isMaintainer ? maintainerCards : contributorCards;

  const { data } = HackathonReactQueryAdapter.client.useGetHackathons({
    options: {
      enabled: userProfile && !isMaintainer,
    },
  });
  const liveHackathon = data?.hackathons.find(h => h.isLive());

  useEffect(() => {
    if (userProfile && hasOnboardingCompletedParam) {
      setIsOpen(true);
    }
  }, [userProfile]);

  function handleClose() {
    setIsOpen(false);

    const { origin, pathname, search } = window.location;

    const searchParams = new URLSearchParams(search);
    searchParams.delete(ONBOARDING_SEARCH_PARAM);

    router.replace(`${origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
      canDismiss={false}
      size={"l"}
      container={"1"}
      classNames={{ body: "gap-6 md:gap-3" }}
    >
      <Paper size={"l"} container={"2"} classNames={{ base: "grid gap-6" }}>
        <div className="grid gap-3">
          <StepHeader step={3} />

          <Title
            title={{ token: "v2.pages.signup.onboarding.completed.title" }}
            content={{ token: "v2.pages.signup.onboarding.completed.content" }}
          />
        </div>

        <div className="grid gap-2 md:grid-cols-3">
          {cards.map(card => (
            <Card key={card.title} {...card} />
          ))}
        </div>

        {liveHackathon ? (
          <HackathonCard
            title={liveHackathon.title}
            slug={liveHackathon.slug}
            backgroundImage={liveHackathon.getBackgroundImage()}
            location={liveHackathon.location}
            status={liveHackathon.getStatus()}
            projects={liveHackathon.projects}
            subscriberCount={liveHackathon.subscriberCount}
            openIssueCount={liveHackathon.openIssueCount}
            issueCount={liveHackathon.issueCount}
            dates={liveHackathon.formatDisplayDates()}
            showCta={false}
          />
        ) : null}
      </Paper>

      <footer className={"hidden items-center justify-end gap-2 md:flex"}>
        {isMaintainer ? (
          <Button
            as={BaseLink}
            htmlProps={{
              href: NEXT_ROUTER.projects.creation,
            }}
            translate={{ token: "v2.pages.signup.onboarding.completed.sections.submitProject.cta" }}
          />
        ) : null}

        <Button
          variant={"secondary-light"}
          translate={{ token: "v2.pages.signup.onboarding.completed.cta" }}
          endIcon={{ remixName: "ri-arrow-right-s-line" }}
          onClick={handleClose}
        />
      </footer>

      <footer className={"flex flex-col items-center justify-end gap-6 md:hidden"}>
        {isMaintainer ? (
          <Button
            as={BaseLink}
            htmlProps={{
              href: NEXT_ROUTER.projects.creation,
            }}
            size={"l"}
            translate={{ token: "v2.pages.signup.onboarding.completed.sections.submitProject.cta" }}
            classNames={{ base: "w-full" }}
          />
        ) : null}

        <Button
          variant={"secondary-light"}
          size={"l"}
          translate={{ token: "v2.pages.signup.onboarding.completed.cta" }}
          endIcon={{ remixName: "ri-arrow-right-s-line" }}
          onClick={handleClose}
          classNames={{ base: "w-full" }}
        />
      </footer>
    </Modal>
  );
}
