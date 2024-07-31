"use client";

import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Completed1 from "public/images/onboarding/completed-1.png";
import Completed2 from "public/images/onboarding/completed-2.png";
import Completed3 from "public/images/onboarding/completed-3.png";
import { useEffect, useState } from "react";

import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { BaseLink } from "components/layout/base-link/base-link";
import { Modal } from "components/molecules/modal";

import { NEXT_ROUTER } from "constants/router";

import { Key, useIntl } from "hooks/translate/use-translate";

type Card = {
  title: Key;
  content: Key;
  image: 1 | 2 | 3;
};

function Card({ title, content, image }: Card) {
  const { T } = useIntl();

  const images = {
    1: Completed1,
    2: Completed2,
    3: Completed3,
  };

  return (
    <Paper size={"s"} container={"3"} classNames={{ base: "flex md:flex-col gap-2 content-start items-center" }}>
      <Image
        src={images[image]}
        alt={T("title")}
        className={"max-w-24 rounded-lg border border-container-stroke-separator md:max-w-full"}
      />
      <div className={"grid"}>
        <Typo size={"l"} weight={"medium"} translate={{ token: title }} />
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
    image: 1,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.exploreEcosystems.title",
    content: "v2.pages.signup.onboarding.completed.sections.exploreEcosystems.content",
    image: 2,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.applyGrant.title",
    content: "v2.pages.signup.onboarding.completed.sections.applyGrant.content",
    image: 3,
  },
];

const contributorCards: Card[] = [
  {
    title: "v2.pages.signup.onboarding.completed.sections.exploreProjects.title",
    content: "v2.pages.signup.onboarding.completed.sections.exploreProjects.content",
    image: 1,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.joinProject.title",
    content: "v2.pages.signup.onboarding.completed.sections.joinProject.content",
    image: 2,
  },
  {
    title: "v2.pages.signup.onboarding.completed.sections.earnRewards.title",
    content: "v2.pages.signup.onboarding.completed.sections.earnRewards.content",
    image: 3,
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

  // TODO @hayden handle mobile scroll

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
