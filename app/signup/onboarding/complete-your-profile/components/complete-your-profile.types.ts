import { z } from "zod";

export namespace TCompleteYourProfile {
  export const validation = z.object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    location: z.string().trim().optional(),
    bio: z.string().trim().optional(),
    website: z.string().trim().optional(),
  });

  export type form = z.infer<typeof validation>;
}
