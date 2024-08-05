import { bootstrap } from "core/bootstrap";
import { z } from "zod";

export namespace TVerifyInformation {
  export const validation = z.object({
    email: z.string().min(1),
    telegram: z
      .string()
      .regex(bootstrap.getContactHelperPort().regex.telegram, "v2.commons.form.errors.invalidUsername")
      .optional(),
  });

  export type form = z.infer<typeof validation>;
}
