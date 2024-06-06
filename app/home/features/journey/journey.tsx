import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TJourney } from "./journey.types";

export function Journey(_: TJourney.Props) {
  return (
    <div className={cn("w-full", styles.areaJourney)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Journey",
        }}
      >
        <Card background={"base"}>Journey</Card>
      </Section>
    </div>
  );
}
