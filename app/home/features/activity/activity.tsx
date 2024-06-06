import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import styles from "../../styles/styles.module.css";
import { TActivity } from "./activity.types";

export function Activity(_: TActivity.Props) {
  return (
    <div className={cn("w-full", styles.areaActivity)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Activity",
        }}
      >
        <Card background={"base"}>Activity</Card>
      </Section>
    </div>
  );
}
