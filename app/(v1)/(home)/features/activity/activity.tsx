"use client";

import { ActivityViewer } from "app/(v1)/(home)/features/activity/components/activity-viewer/activity-viewer";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { ClientOnly } from "components/layout/client-only/client-only";
import { Section } from "components/layout/section/section";

import styles from "../../styles/styles.module.css";
import { TActivity } from "./activity.types";

export function Activity(_: TActivity.Props) {
  return (
    <div className={cn("w-full", styles.areaActivity)}>
      <Section
        iconProps={{ remixName: "ri-fire-line" }}
        titleProps={{ translate: { token: "v2.pages.home.activity.title" } }}
      >
        <Card background={"base"} className="h-[410px] overflow-hidden">
          <ClientOnly>
            <ActivityViewer />
          </ClientOnly>
        </Card>
      </Section>
    </div>
  );
}
