import { z } from "zod";

import { REGEX } from "app/settings/profile/features/form/form.regex";

export namespace TVerificationInformation {
  export const validation = z.object({
    email: z.string().min(1),
    telegram: z.string().regex(REGEX.telegram, "v2.commons.form.errors.invalidUsername").min(1),
  });

  export type form = z.infer<typeof validation>;
}
