"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LanguageReactQueryAdapter } from "core/application/react-query-adapter/language";
import { ProjectCategoryReactQueryAdapter } from "core/application/react-query-adapter/project-category";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { sanitizeData } from "app/(v1)/signup/onboarding/onboarding.utils";

import { toast } from "components/atoms/toaster";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { TProjectRecommendationContext } from "./project-recommendations.context.type";

export const ProjectRecommendationContext = createContext<TProjectRecommendationContext.Return>({
  categories: [],
  languages: [],
  goals: [],
  onSubmit: () => null,
  isInvalid: false,
});

export function ProjectRecommendationContextProvider({ children }: TProjectRecommendationContext.Props) {
  const { data: categories } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});
  const { data: languages } = LanguageReactQueryAdapter.client.useGetLanguages({});
  const router = useRouter();
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userProfile } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const form = useForm<TProjectRecommendationContext.form>({
    mode: "all",
    resolver: zodResolver(TProjectRecommendationContext.validation),
    defaultValues: {
      preferredCategories: [],
      preferredLanguages: [],
      isLookingForAJob: false,
    },
  });

  const { mutateAsync: setMyProfile } = UserReactQueryAdapter.client.useSetMyProfile({
    options: {
      onSuccess: () => {
        toast.default(<Translate token={"v2.pages.signup.onboarding.common.updateProfile.toast.success"} />);
        router.push(NEXT_ROUTER.signup.onboarding.root);
      },
      onError: () => {
        toast.error(<Translate token={"v2.pages.signup.onboarding.common.updateProfile.toast.error"} />);
      },
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        isLookingForAJob: userProfile.isLookingForAJob || false,
        preferredCategories: userProfile.preferredCategories?.map(category => category.id) || [],
        preferredLanguages: userProfile.preferredLanguages?.map(language => language.id) || [],
        joiningGoal: userProfile.joiningGoal,
      });
    }
  }, [userProfile]);

  async function onSubmit(data: TProjectRecommendationContext.form) {
    await setMyProfile({
      ...sanitizeData("joiningGoal", data.joiningGoal),
      ...sanitizeData("isLookingForAJob", data.isLookingForAJob),
      ...sanitizeData("preferredCategories", data.preferredCategories),
      ...sanitizeData("preferredLanguages", data.preferredLanguages),
    });
  }

  return (
    <ProjectRecommendationContext.Provider
      value={{
        categories: categories?.categories || [],
        languages: languages?.languages || [],
        goals: ["LEARN", "CHALLENGE", "EARN", "NOTORIETY"],
        onSubmit: form.handleSubmit(onSubmit),
        isInvalid: !form.formState.isValid,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </ProjectRecommendationContext.Provider>
  );
}
