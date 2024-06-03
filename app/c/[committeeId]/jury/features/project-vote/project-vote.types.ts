import { CommitteeJuryVoteResponse } from "api-client/resources/me/types";
import { z } from "zod";

export namespace TProjectVote {
  export interface Props {
    projectId: string;
    votes: CommitteeJuryVoteResponse[];
  }

  export const validation = z.object({
    votes: z.array(
      z.object({
        criteriaId: z.string().min(1),
        criteria: z.string().min(1),
        vote: z.number(),
      })
    ),
  });

  export type form = z.infer<typeof validation>;
}
