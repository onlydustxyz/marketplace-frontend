import React, { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Title } from "app/(v1)/signup/components/title/title";
import { ProjectRecommendationContext } from "app/(v1)/signup/onboarding/project-recommendations/context/project-recommendations.context";
import { TProjectRecommendationContext } from "app/(v1)/signup/onboarding/project-recommendations/context/project-recommendations.context.type";

import { Paper } from "components/atoms/paper";
import { CheckboxButton } from "components/molecules/checkbox-button";

export function Languages() {
  const { languages } = useContext(ProjectRecommendationContext);
  const { control, setValue } = useFormContext<TProjectRecommendationContext.form>();

  function onLanguageChange(
    value: TProjectRecommendationContext.form["preferredLanguages"],
    languageId: string,
    checked: boolean
  ) {
    const newValue = [...(value || [])];

    if (newValue.includes(languageId) && !checked) {
      newValue.splice(newValue.indexOf(languageId), 1);
    } else if (checked && !newValue.includes(languageId)) {
      newValue.push(languageId);
    }

    setValue("preferredLanguages", newValue, { shouldDirty: true, shouldValidate: true });
  }

  return (
    <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <Title
        title={{ token: "v2.pages.signup.onboarding.projectRecommendations.languages.title" }}
        content={{ token: "v2.pages.signup.onboarding.projectRecommendations.languages.content" }}
      />
      <Controller
        control={control}
        name={"preferredLanguages"}
        render={({ field: { value } }) => (
          <div className="flex w-full flex-row flex-wrap gap-2">
            {languages.map(language => (
              <CheckboxButton
                value={(value || []).includes(language.id)}
                key={language.id}
                onChange={(checked: boolean) => onLanguageChange(value, language.id, checked)}
              >
                {language.name}
              </CheckboxButton>
            ))}
          </div>
        )}
      />
    </Paper>
  );
}
