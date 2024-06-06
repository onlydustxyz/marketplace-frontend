import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TRewards } from "./rewards.types";

export function Rewards(_: TRewards.Props) {
  return (
    <div className={cn("w-full", styles.areaRewards)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Rewards",
        }}
        hasPadding={false}
      >
        <Card background={"base"}>Rewards</Card>
      </Section>
    </div>
  );
}
