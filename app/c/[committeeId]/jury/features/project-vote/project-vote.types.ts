import { z } from "zod";

export namespace TProjectVote {
  export interface Props {
    projectId: string;
    criteria: {
      message: string;
      score: number;
    }[];
  }

  export const validation = z.object({
    criteria: z.array(z.object({})),
  });

  export type form = z.infer<typeof validation>;
}
