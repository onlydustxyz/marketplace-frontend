import React from "react";

import { Title } from "app/signup/components/title/title";

import { Paper } from "components/atoms/paper";

import { TCategories } from "./categories.types";

export function Categories(_: TCategories.Props) {
  return (
    <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <Title
        title={{ token: "v2.pages.signup.onboarding.projectRecommendations.categories.title" }}
        content={{ token: "v2.pages.signup.onboarding.projectRecommendations.categories.content" }}
      />
    </Paper>
  );
}
