import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TTrendyProjects } from "./trendy-projects.types";

export function TrendyProjects(_: TTrendyProjects.Props) {
  return (
    <div className={cn("w-full", styles.areaTrendyProjects)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Trendy Projects",
        }}
      >
        <Card background={"base"}>Trendy Projects</Card>
      </Section>
    </div>
  );
}
