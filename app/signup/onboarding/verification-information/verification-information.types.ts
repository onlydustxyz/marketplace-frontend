import { bootstrap } from "core/bootstrap";
import { z } from "zod";

export namespace TVerificationInformation {
  export const validation = z.object({
    email: z.string().min(1),
    telegram: z
      .string()
      .regex(bootstrap.getContactHelperPort().regex.telegram, "v2.commons.form.errors.invalidUsername")
      .min(1),
  });

  export type form = z.infer<typeof validation>;
}
