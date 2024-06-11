"use client";

import { meApiClient } from "api-client/resources/me";
import { useMemo } from "react";

import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { TJourney } from "./journey.types";

function JourneyItem({ stepName, completion }: TJourney.JourneyItemProps) {
  return useMemo(() => {
    if (!completion) {
      return (
        <BaseLink
          href={TJourney.stepMapping[stepName].link}
          className="flex items-center gap-3 px-3 py-4 transition-all hover:bg-card-background-medium sm:gap-5 sm:px-5 sm:py-6"
        >
          <Card
            background={"light"}
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            hasPadding={false}
          >
            <Icon remixName={TJourney.stepMapping[stepName].icon} size={22} />
          </Card>
          <div className="flex-1">
            <Typography translate={{ token: `v2.pages.home.journey.steps.${stepName}.title` }} variant="body-m" />
            <Typography
              translate={{ token: `v2.pages.home.journey.steps.${stepName}.description` }}
              variant="body-s"
              className="text-spaceBlue-200"
            />
          </div>
          <IconTag icon={{ remixName: "ri-arrow-right-s-line", size: 12 }} size={"s"} />
        </BaseLink>
      );
    }

    return (
      <div className="flex items-center gap-3 px-3 py-4 sm:gap-5 sm:px-5 sm:py-6">
        <Card background={"light"} className="flex h-10 w-10 items-center justify-center rounded-lg" hasPadding={false}>
          <Icon remixName={TJourney.stepMapping[stepName].icon} size={22} />
        </Card>
        <div className="flex-1">
          <Typography translate={{ token: `v2.pages.home.journey.steps.${stepName}.title` }} variant="body-m" />
          <Typography
            translate={{ token: `v2.pages.home.journey.steps.${stepName}.description` }}
            variant="body-s"
            className="text-spaceBlue-200"
          />
        </div>
        <IconTag
          icon={{ remixName: "ri-check-line", size: 12 }}
          size={"s"}
          className="bg-spacePurple-900 text-spacePurple-500"
        />
      </div>
    );
  }, [completion]);
}

export function JourneyPrivate(_: TJourney.JourneyPrivateProps) {
  const { data, isLoading } = meApiClient.queries.useGetMyJourney({});

  const steps = useMemo(() => {
    return [
      { stepName: "step1", completion: data.individualBillingProfileSetup },
      { stepName: "step2", completion: data.firstContributionMade },
      { stepName: "step3", completion: data.firstRewardClaimed },
      { stepName: "step4", completion: data.descriptionUpdated },
      { stepName: "step5", completion: data.telegramAdded },
    ];
  }, [data]);

  if (!data && !isLoading) return null;

  return (
    <div className={cn("w-full", styles.areaJourney)}>
      <Section
        iconProps={{ remixName: "ri-rocket-2-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.journey.title",
          },
        }}
      >
        <Card background={"base"} className="flex flex-col" hasPadding={false}>
          <div className="flex items-center gap-2 px-3 py-4 pb-1.5 sm:px-5 sm:py-6 sm:pb-1.5">
            <ProgressBar
              maxValue={100}
              value={data?.completion}
              color="spacePurple"
              classNames={{
                track: "h-4",
              }}
            />
            <Typography
              variant="body-l-bold"
              translate={{ token: "v2.pages.home.journey.progressPercentage", params: { count: data.completion } }}
              className="text-spaceBlue-200"
            />
          </div>
          <div className="flex flex-col divide-y divide-card-border-light">
            {steps.map(({ stepName, completion }) => (
              <JourneyItem key={stepName} stepName={stepName} completion={completion} />
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}
