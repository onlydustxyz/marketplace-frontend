import { z } from "zod";

export namespace TProjectVote {
  const criterion = z.object({
    message: z.string().min(1),
    score: z.number().min(1),
  });

  type Criterion = z.infer<typeof criterion>;

  export interface Props {
    projectId: string;
    criteria: Criterion[];
  }

  export const validation = z.object({
    criteria: z.array(criterion),
  });

  export type form = z.infer<typeof validation>;
}
