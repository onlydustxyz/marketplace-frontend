import { z } from "zod";

const validationSchema = z.object({
  organizations: z
    .array(
      z.object({
        organization: z.object({
          repos: z.array(z.object({ githubId: z.number(), selected: z.boolean().optional() })),
        }),
      })
    )
    .refine(
      organizations => {
        return (
          organizations.filter(organization => organization.organization.repos.find(repo => repo.selected)).length > 0
        );
      },
      {
        message: "",
      }
    ),
});

export default validationSchema;
