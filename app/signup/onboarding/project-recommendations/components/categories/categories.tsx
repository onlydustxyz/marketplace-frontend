"use client";

import React, { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Title } from "app/signup/components/title/title";
import { ProjectRecommendationContext } from "app/signup/onboarding/project-recommendations/context/project-recommendations.context";
import { TProjectRecommendationContext } from "app/signup/onboarding/project-recommendations/context/project-recommendations.context.type";

import { Paper } from "components/atoms/paper";
import { CheckboxButton } from "components/molecules/checkbox-button";

import { TCategories } from "./categories.types";

export function Categories(_: TCategories.Props) {
  const { categories } = useContext(ProjectRecommendationContext);
  const { control, setValue } = useFormContext<TProjectRecommendationContext.form>();

  function onCategoryChange(
    value: TProjectRecommendationContext.form["preferredCategories"],
    categoryId: string,
    checked: boolean
  ) {
    const newValue = [...(value || [])];

    if (newValue.includes(categoryId) && !checked) {
      newValue.splice(newValue.indexOf(categoryId), 1);
    } else if (checked && !newValue.includes(categoryId)) {
      newValue.push(categoryId);
    }

    setValue("preferredCategories", newValue, { shouldDirty: true, shouldValidate: true });
  }
  return (
    <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <Title
        title={{ token: "v2.pages.signup.onboarding.projectRecommendations.categories.title" }}
        content={{ token: "v2.pages.signup.onboarding.projectRecommendations.categories.content" }}
      />
      <Controller
        control={control}
        name={"preferredCategories"}
        render={({ field: { value } }) => (
          <div className="flex w-full flex-row flex-wrap gap-2">
            {categories.map(category => (
              <CheckboxButton
                key={category.id}
                onChange={(checked: boolean) => onCategoryChange(value, category.id, checked)}
              >
                {category.name}
              </CheckboxButton>
            ))}
          </div>
        )}
      />
    </Paper>
  );
}
