import { z } from "zod";

import { REGEX } from "app/(v1)/settings/profile/features/form/form.regex";

import { ButtonDefaultPort } from "components/atoms/button/button.types";
import { TooltipPort } from "components/atoms/tooltip";

export namespace TRegister {
  export interface Props {
    hackathonId: string;
    hackathonSlug: string;
    hackathonTitle: string;
    hackathonBackgroundImage: string;
    buttonProps: ButtonDefaultPort<"button">;
    tooltipProps: TooltipPort<"div">;
    hackathonIsLive: boolean;
  }

  export const validation = z.object({
    telegram: z.string().regex(REGEX.telegram, "v2.commons.form.errors.invalidUsername").min(1),
  });

  export type form = z.infer<typeof validation>;

  export interface HookProps {
    hackathonId: string;
    hackathonSlug: string;
  }
}
