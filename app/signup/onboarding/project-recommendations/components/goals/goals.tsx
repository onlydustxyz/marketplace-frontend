import React from "react";

import { Title } from "app/signup/components/title/title";

import { Paper } from "components/atoms/paper";

import { TGoals } from "./goals.types";

export function Goals(_: TGoals.Props) {
  return (
    <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <Title
        title={{ token: "v2.pages.signup.onboarding.projectRecommendations.goal.title" }}
        content={{ token: "v2.pages.signup.onboarding.projectRecommendations.goal.content" }}
      />
    </Paper>
  );
}
