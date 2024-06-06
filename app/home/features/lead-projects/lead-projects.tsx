import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TLeadProjects } from "./lead-projects.types";

export function LeadProjects(_: TLeadProjects.Props) {
  return (
    <div className={cn("w-full", styles.areaLeadProjects)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Lead Projects",
        }}
        hasPadding={false}
      >
        <Card background={"base"}>Lead projects</Card>
      </Section>
    </div>
  );
}
