"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LanguagesReactQueryAdapter } from "core/application/react-query-adapter/languages";
import { ProjectCategoriesReactQueryAdapter } from "core/application/react-query-adapter/project-categories";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  const { data: categories } = ProjectCategoriesReactQueryAdapter.client.useGetProjectCategories({});
  const { data: languages } = LanguagesReactQueryAdapter.client.useGetLanguages({});
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
        isLookingForAJob: userProfile.isLookingForAJob,
      });
    }
  }, [userProfile]);

  async function onSubmit(data: TProjectRecommendationContext.form) {
    await setMyProfile({
      ...data,
      goal: data.goal as TProjectRecommendationContext.Goal,
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
