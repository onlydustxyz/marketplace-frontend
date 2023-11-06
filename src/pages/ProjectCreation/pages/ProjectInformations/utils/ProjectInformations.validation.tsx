import { z } from "zod";

const validationSchema = z.object({
  image: z.instanceof(File).optional(),
  inviteGithubUserIdsAsProjectLeads: z.array(z.number()),
  isLookingForContributors: z.boolean().optional(),
  longDescription: z.string().min(1),
  moreInfo: z.object({
    url: z.string().min(1),
    value: z.string().min(1),
  }),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
});

export default validationSchema;
