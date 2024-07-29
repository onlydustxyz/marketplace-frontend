import React from "react";

import { Title } from "app/signup/components/title/title";

import { Paper } from "components/atoms/paper";

import { TLanguages } from "./languages.types";

export function Languages(_: TLanguages.Props) {
  return (
    <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <Title
        title={{ token: "v2.pages.signup.onboarding.projectRecommendations.languages.title" }}
        content={{ token: "v2.pages.signup.onboarding.projectRecommendations.languages.content" }}
      />
    </Paper>
  );
}
