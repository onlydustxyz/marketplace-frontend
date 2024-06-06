import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TProfile } from "./profile.types";

export function Profile(_: TProfile.Props) {
  return (
    <div className={cn("w-full", styles.areaProfile)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Profile",
        }}
        hasPadding={false}
      >
        <Card background={"base"}>Profile</Card>
      </Section>
    </div>
  );
}
