"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectCategoriesReactQueryAdapter } from "core/application/react-query-adapter/project-categories";
import { createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { TProjectRecommendationContext } from "./project-recommendations.context.type";

export const ProjectRecommendationContext = createContext<TProjectRecommendationContext.Return>({
  categories: [],
  goals: [],
});

export function ProjectRecommendationContextProvider({ children }: TProjectRecommendationContext.Props) {
  const { data: categories } = ProjectCategoriesReactQueryAdapter.client.useGetProjectCategories({});

  const form = useForm<TProjectRecommendationContext.form>({
    mode: "all",
    resolver: zodResolver(TProjectRecommendationContext.validation),
    defaultValues: {
      categoriesIds: [],
    },
  });

  console.log("FORM", form.watch());

  return (
    <ProjectRecommendationContext.Provider
      value={{
        categories: categories?.categories || [],
        goals: ["earn", "learn", "challenge", "notoriety"],
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </ProjectRecommendationContext.Provider>
  );
}
