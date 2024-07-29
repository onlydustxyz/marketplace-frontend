"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectCategoriesReactQueryAdapter } from "core/application/react-query-adapter/project-categories";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useRouter } from "next/navigation";
import { createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { NEXT_ROUTER } from "constants/router";

import { TProjectRecommendationContext } from "./project-recommendations.context.type";

export const ProjectRecommendationContext = createContext<TProjectRecommendationContext.Return>({
  categories: [],
  goals: [],
  onSubmit: () => null,
});

export function ProjectRecommendationContextProvider({ children }: TProjectRecommendationContext.Props) {
  const { data: categories } = ProjectCategoriesReactQueryAdapter.client.useGetProjectCategories({});
  const router = useRouter();
  const form = useForm<TProjectRecommendationContext.form>({
    mode: "all",
    resolver: zodResolver(TProjectRecommendationContext.validation),
    defaultValues: {
      categoriesIds: [],
    },
  });

  const { mutateAsync: setMyProfile } = UserReactQueryAdapter.client.useSetMyProfile();

  async function onSubmit(data: TProjectRecommendationContext.form) {
    try {
      await setMyProfile({ ...data, goal: data.goal as TProjectRecommendationContext.Goals });
      router.push(NEXT_ROUTER.signup.onboarding.root);
    } catch {
      // TODO toaster
    }
  }

  return (
    <ProjectRecommendationContext.Provider
      value={{
        categories: categories?.categories || [],
        goals: ["earn", "learn", "challenge", "notoriety"],
        onSubmit: form.handleSubmit(onSubmit),
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </ProjectRecommendationContext.Provider>
  );
}
