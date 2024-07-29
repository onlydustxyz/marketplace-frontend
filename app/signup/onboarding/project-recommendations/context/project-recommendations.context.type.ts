import { ProjectCategoryInterface } from "core/domain/project-categories/models/project-category-model";
import { PropsWithChildren } from "react";
import { z } from "zod";

export namespace TProjectRecommendationContext {
  export interface Props extends PropsWithChildren {}

  export interface Return {
    categories: ProjectCategoryInterface[];
  }

  export const validation = z.object({
    categoriesIds: z.array(z.string()).optional(),
  });

  export type form = z.infer<typeof validation>;
}
