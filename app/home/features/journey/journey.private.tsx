"use client";

import { meApiClient } from "api-client/resources/me";

import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { TJourney } from "./journey.types";

function JourneyItem({ stepName, completion }: TJourney.JourneyItemProps) {
  return (
    <div className="flex items-center gap-4 py-5">
      <Card background={"light"} className="w-fit !p-4">
        <Icon remixName={TJourney.stepMapping[stepName]} size={24} />
      </Card>
      <div className="flex-1">
        <Typography translate={{ token: `v2.pages.home.journey.steps.${stepName}.title` }} variant="body-m" />
        <Typography
          translate={{ token: `v2.pages.home.journey.steps.${stepName}.description` }}
          variant="body-s"
          className="text-spaceBlue-200"
        />
      </div>
      <IconTag icon={{ remixName: completion ? "ri-check-line" : "ri-arrow-right-s-line", size: 12 }} size={"s"} />
    </div>
  );
}

export function JourneyPrivate(_: TJourney.JourneyPrivateProps) {
  const { data, isLoading } = meApiClient.queries.useGetMyJourney({});

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
        <Card background={"base"} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
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
            <JourneyItem stepName="step1" completion={data.individualBillingProfileSetup} />
            <JourneyItem stepName="step1" completion={data.individualBillingProfileSetup} />
          </div>
        </Card>
      </Section>
    </div>
  );
}
