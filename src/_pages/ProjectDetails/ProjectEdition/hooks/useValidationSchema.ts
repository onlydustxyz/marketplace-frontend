import { z } from "zod";

import { ZodUtils } from "src/utils/Zod";

import { useIntl } from "hooks/translate/use-translate";

export const useEditValidationSchema = () => {
  const { T } = useIntl();

  return z.object({
    logoUrl: z.string().nullish(),
    inviteGithubUserIdsAsProjectLeads: z.array(z.number()).optional(),
    isLookingForContributors: z.boolean().nullish().optional(),
    longDescription: z
      .string(
        ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the long description of the project" }))
      )
      .min(1),
    moreInfos: z
      .array(
        z
          .object({
            url: z
              .string(ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the information url" })))
              .trim()
              .nullish()
              .optional(),
            value: z.string().nullish().optional(),
          })
          .refine(data => !!data.url || (!data.url && !data.value) || (!!data.url && !!data.value), {
            path: ["url"],
            message: T("forms.error.require", { fieldName: "the information url" }),
          })
      )
      .min(0),
    name: z
      .string(ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the name of the project" })))
      .min(1),
    githubRepos: z.array(z.object({ id: z.number(), isAuthorizedInGithubApp: z.boolean().optional() })).min(1),
    ecosystems: z.array(z.object({ id: z.number().or(z.string()) })).optional(),
    suggestedProjectCategories: z.array(z.string()),
    projectCategories: z.array(z.object({ id: z.number().or(z.string()) })).optional(),
    projectLeadsToKeep: z.array(z.string()).min(1),
    shortDescription: z
      .string(
        ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the short description of the project" }))
      )
      .min(1),
    rewardSettings: z.object({
      ignorePullRequests: z.boolean().nullish().optional(),
      ignoreIssues: z.boolean().nullish().optional(),
      ignoreCodeReviews: z.boolean().nullish().optional(),
      ignoreContributionsBefore: z.coerce.date().optional(),
    }),
  });
};
