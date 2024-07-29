import { ProjectCategoryInterface } from "core/domain/project-categories/models/project-category-model";
import { PropsWithChildren } from "react";
import { z } from "zod";

export namespace TProjectRecommendationContext {
  export interface Props extends PropsWithChildren {}

  export type Goals = "learn" | "challenge" | "earn" | "notoriety";
  export interface Return {
    categories: ProjectCategoryInterface[];
    goals: Goals[];
  }

  export const validation = z.object({
    goal: z.string(),
    categoriesIds: z.array(z.string()).optional(),
  });

  export type form = z.infer<typeof validation>;
}
