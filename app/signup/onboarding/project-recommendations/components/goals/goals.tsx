"use client";

import { PropsWithChildren, ReactNode, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Title } from "app/signup/components/title/title";
import { ProjectRecommendationContext } from "app/signup/onboarding/project-recommendations/context/project-recommendations.context";
import { TProjectRecommendationContext } from "app/signup/onboarding/project-recommendations/context/project-recommendations.context.type";

import { Paper } from "components/atoms/paper";
import { RadioGroup } from "components/atoms/radio-group";
import { Switch } from "components/atoms/switch";
import { Typo } from "components/atoms/typo";

import { Key } from "hooks/translate/use-translate";

import { TGoals } from "./goals.types";

export function CustomRadioComponent({
  goal,
  children,
}: { goal: TProjectRecommendationContext.Goal } & PropsWithChildren): ReactNode {
  const translates: { [key in TProjectRecommendationContext.Goal]: { title: Key; content: Key } } = {
    EARN: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.money.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.money.content",
    },
    LEARN: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.skill.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.skill.content",
    },
    CHALLENGE: {
      title: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.challenge.title",
      content: "v2.pages.signup.onboarding.projectRecommendations.goal.choices.challenge.content",
    },
    NOTORIETY: {
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
        name={"joiningGoal"}
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
              classNames={{
                item: "w-full",
              }}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name={"isLookingForAJob"}
        render={({ field: { value, onChange } }) => (
          <Paper
            size={"s"}
            container={"transparent"}
            classNames={{ base: "flex flex-row gap-2 items-center justify-start" }}
          >
            <Paper
              size={"m"}
              container={"3"}
              classNames={{ base: "flex items-center justify-center rounded-lg px-2.5" }}
            >
              <Switch isActive={value || false} onChange={onChange} />
            </Paper>
            <div className="flex flex-1 flex-col">
              <Typo
                size="l"
                weight={"medium"}
                translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.goal.lookingForAJob.title" }}
              />
              <Typo
                size="s"
                translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.goal.lookingForAJob.content" }}
              />
            </div>
          </Paper>
        )}
      />
    </Paper>
  );
}
