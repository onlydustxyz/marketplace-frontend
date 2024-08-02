"use client";

import { useMemo } from "react";

import { TJourney } from "app/(home)/features/journey/journey.types";

import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function JourneyItem({ stepName, completion }: TJourney.JourneyItemProps) {
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
              translate={{ token: `v2.pages.home.journey.steps.${stepName}.content` }}
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
            translate={{ token: `v2.pages.home.journey.steps.${stepName}.content` }}
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
