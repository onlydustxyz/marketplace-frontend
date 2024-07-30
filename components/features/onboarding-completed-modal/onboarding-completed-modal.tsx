"use client";

import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { IMAGES } from "src/assets/img";

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
  cta?: { label: Key; href: string };
};

function Card({ title, content, cta }: Card) {
  const { T } = useIntl();

  return (
    <Paper size={"s"} container={"3"} classNames={{ base: "grid gap-2 content-start" }}>
      <img
        // TODO @hayden handle real images
        src={IMAGES.logo.space}
        alt={T("title")}
        className={"rounded-lg border border-container-stroke-separator"}
      />
      <div className={"grid"}>
        <Typo size={"l"} weight={"medium"} translate={{ token: title }} />
        <Typo size={"s"} color={"text-2"} translate={{ token: content }} />
      </div>
      {cta ? (
        <div>
          <Button
            as={BaseLink}
            htmlProps={{
              href: cta.href,
            }}
            translate={{ token: cta.label }}
          ></Button>
        </div>
      ) : null}
    </Paper>
  );
}

const ONBOARDING_SEARCH_PARAM = "onboardingCompleted";

export function OnboardingCompletedModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const onboardingCompleted = searchParams.has(ONBOARDING_SEARCH_PARAM);

  const [isOpen, setIsOpen] = useState(onboardingCompleted);

  // TODO @hayden handle condition
  const isMaintainer = false;

  const { data } = HackathonReactQueryAdapter.client.useGetHackathons({
    options: {
      enabled: !isMaintainer,
    },
  });
  const liveHackathon = data?.hackathons.find(h => h.isLive());

  const maintainerCards: Card[] = [
    {
      title: "v2.pages.signup.onboarding.completed.sections.submitProject.title",
      content: "v2.pages.signup.onboarding.completed.sections.submitProject.content",
      cta: {
        label: "v2.pages.signup.onboarding.completed.sections.submitProject.cta",
        href: NEXT_ROUTER.projects.creation,
      },
    },
    {
      title: "v2.pages.signup.onboarding.completed.sections.exploreEcosystems.title",
      content: "v2.pages.signup.onboarding.completed.sections.exploreEcosystems.content",
    },
    {
      title: "v2.pages.signup.onboarding.completed.sections.applyGrant.title",
      content: "v2.pages.signup.onboarding.completed.sections.applyGrant.content",
    },
  ];

  const contributorCards: Card[] = [
    {
      title: "v2.pages.signup.onboarding.completed.sections.exploreProjects.title",
      content: "v2.pages.signup.onboarding.completed.sections.exploreProjects.content",
    },
    {
      title: "v2.pages.signup.onboarding.completed.sections.joinProject.title",
      content: "v2.pages.signup.onboarding.completed.sections.joinProject.content",
    },
    {
      title: "v2.pages.signup.onboarding.completed.sections.earnRewards.title",
      content: "v2.pages.signup.onboarding.completed.sections.earnRewards.content",
    },
  ];

  const cards = isMaintainer ? maintainerCards : contributorCards;

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
    >
      <Paper size={"l"} container={"2"} classNames={{ base: "grid gap-6" }}>
        <div className="grid gap-3">
          <StepHeader step={3} />

          <Title
            title={{ token: "v2.pages.signup.onboarding.completed.title" }}
            content={{ token: "v2.pages.signup.onboarding.completed.content" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
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

      <footer className={"flex justify-end"}>
        <Button
          variant={"secondary-light"}
          translate={{ token: "v2.pages.signup.onboarding.completed.cta" }}
          endIcon={{ remixName: "ri-arrow-right-s-line" }}
          onClick={handleClose}
        />
      </footer>
    </Modal>
  );
}
