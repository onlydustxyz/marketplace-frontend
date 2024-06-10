import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TRecommendedProjects } from "./recommended-projects.types";

export function RecommendedProjects(_: TRecommendedProjects.Props) {
  return (
    <div className={cn("w-full", styles.areaRecommendedProjects)}>
      <Section
        iconProps={{ remixName: "ri-folder-3-line" }}
        titleProps={{
          translate: { token: "v2.pages.home.recommendedProjects.title" },
        }}
      >
        <Card background={"base"}>Recommended Projects</Card>
      </Section>
    </div>
  );
}
