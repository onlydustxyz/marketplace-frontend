"use client";

import React, { PropsWithChildren, ReactNode, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Title } from "app/signup/components/title/title";
import { ProjectRecommendationContext } from "app/signup/onboarding/project-recommendations/context/project-recommendations.context";
import { TProjectRecommendationContext } from "app/signup/onboarding/project-recommendations/context/project-recommendations.context.type";

import { Paper } from "components/atoms/paper";
import { RadioGroup } from "components/atoms/radio-group";
import { Typo } from "components/atoms/typo";

import { Key } from "hooks/translate/use-translate";

import { TGoals } from "./goals.types";

export function CustomRadioComponent({
  goal,
  children,
}: { goal: TProjectRecommendationContext.Goals } & PropsWithChildren): ReactNode {
  const translates: { [key in TProjectRecommendationContext.Goals]: { title: Key; content: Key } } = {
    earn: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.money.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.money.content",
    },
    learn: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.skill.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.skill.content",
    },
    challenge: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.challenge.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.challenge.content",
    },
    notoriety: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.notoriety.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.notoriety.content",
    },
  };

  const { title, content } = translates[goal] || { title: "", content: "" };

  return (
    <Paper
      size={"s"}
      container={"transparent"}
      classNames={{ base: "flex flex-row gap-6 items-center justify-between" }}
    >
      <div className="flex flex-1 flex-col">
        <Typo size="l" weight={"medium"} translate={{ token: title }} />
        <Typo size="s" translate={{ token: content }} />
      </div>
      {children}
    </Paper>
  );
}

export function Goals(_: TGoals.Props) {
  const { goals } = useContext(ProjectRecommendationContext);
  const { control } = useFormContext<TProjectRecommendationContext.form>();

  return (
    <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <Title
        title={{ token: "v2.pages.signup.onboarding.projectRecommendations.goal.title" }}
        content={{ token: "v2.pages.signup.onboarding.projectRecommendations.goal.content" }}
      />
      <Controller
        control={control}
        name={"goal"}
        render={({ field: { value, onChange } }) => (
          <div className="flex w-full flex-col flex-wrap gap-2">
            <RadioGroup
              value={value}
              as={CustomRadioComponent}
              onChange={onChange}
              items={goals.map(goal => ({
                value: goal,
                componentProps: { goal },
              }))}
            />
          </div>
        )}
      />
    </Paper>
  );
}
