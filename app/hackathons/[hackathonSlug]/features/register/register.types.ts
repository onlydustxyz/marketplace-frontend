import { z } from "zod";

import { REGEX } from "app/settings/profile/features/form/form.regex";

export namespace TRegister {
  export interface Props {
    hackathonId: string;
    hackathonSlug: string;
  }

  export const validation = z.object({
    telegram: z.string().regex(REGEX.telegram, "v2.commons.form.errors.invalidUsername").min(1),
  });

  export type form = z.infer<typeof validation>;
}
