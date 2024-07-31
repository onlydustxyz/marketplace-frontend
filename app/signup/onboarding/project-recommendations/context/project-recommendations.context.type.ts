import { LanguageInterface } from "core/domain/language/models/language-model";
import { ProjectCategoryInterface } from "core/domain/project-category/models/project-category-model";
import { SetMyProfileBody } from "core/domain/user/user-contract.types";
import { PropsWithChildren } from "react";
import { z } from "zod";

export namespace TProjectRecommendationContext {
  export interface Props extends PropsWithChildren {}

  export type Goal = NonNullable<SetMyProfileBody["goal"]>;

  export interface Return {
    categories: ProjectCategoryInterface[];
    languages: LanguageInterface[];
    goals: Goal[];
    onSubmit(): void;
    isInvalid: boolean;
  }

  export const validation = z.object({
    goal: z.string(),
    preferredCategories: z.array(z.string()).optional(),
    preferredLanguages: z.array(z.string()).optional(),
    isLookingForAJob: z.boolean().optional(),
  });

  export type form = z.infer<typeof validation>;
}
