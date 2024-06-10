import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { TJourney } from "./journey.types";

export function Journey(_: TJourney.Props) {
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
        <Card background={"base"}>
          <div className="flex items-center gap-2">
            <ProgressBar
              maxValue={100}
              value={88}
              color="spacePurple"
              classNames={{
                track: "h-4",
              }}
            />
            <Typography
              variant="body-l-bold"
              translate={{ token: "v2.pages.home.journey.progressPercentage", params: { count: "33" } }}
              className="text-spaceBlue-200"
            />
          </div>
        </Card>
      </Section>
    </div>
  );
}
