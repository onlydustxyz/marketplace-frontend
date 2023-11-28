import { useIntl } from "src/hooks/useIntl";
import { ZodUtils } from "src/utils/Zod";
import { z } from "zod";

export const useEditValidationSchema = () => {
  const { T } = useIntl();

  return z.object({
    logoUrl: z.string().nullish(),
    inviteGithubUserIdsAsProjectLeads: z.array(z.number()).optional(),
    isLookingForContributors: z.boolean().nullish().optional(),
    longDescription: z
      .string(
        ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the long description  of the project" }))
      )
      .min(1),
    moreInfos: z
      .array(
        z.object({
          url: z
            .string(ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the information url" })))
            .trim()
            .min(1),
          value: z
            .string(ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the information label" })))
            .min(1),
        })
      )
      .min(0),
    name: z
      .string(ZodUtils.ErrorMapToMessage(T("forms.error.require", { fieldName: "the name of the project" })))
      .min(1),
    githubRepos: z.array(z.object({ id: z.number(), isAuthorizedInGithubApp: z.boolean().optional() })).min(1),
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
