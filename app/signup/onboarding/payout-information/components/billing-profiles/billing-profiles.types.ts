import { PropsWithChildren } from "react";
import { z } from "zod";

export namespace TBillingProfiles {
  export interface Props extends PropsWithChildren {}

  export const validation = z.object({
    name: z.string(),
    type: z.string(),
  });

  export type form = z.infer<typeof validation>;
}
