import { AnyType } from "core/helpers/types";

import { TTunnelStep } from "app/signup/onboarding/components/tunnel-step/tunnel-step.types";

import { TagPort } from "components/atoms/tag";
import { Translate } from "components/layout/translate/translate";

const useTunnelStepTags = (type: TTunnelStep.stepType): TagPort<AnyType> | undefined => {
  if (type === "mandatory") {
    return {
      color: "purple",
      style: "fill",
      children: <Translate token={"v2.pages.signup.onboarding.tunnel.stepsTags.mandatory"} />,
    };
  }

  if (type === "recommended") {
    return {
      color: "red",
      style: "fill",
      children: <Translate token={"v2.pages.signup.onboarding.tunnel.stepsTags.recommended"} />,
    };
  }

  if (type === "optional") {
    return {
      color: "purple",
      style: "outline",
      children: <Translate token={"v2.pages.signup.onboarding.tunnel.stepsTags.optional"} />,
    };
  }
  return undefined;
};

export const tunnelStepHooks = {
  useTunnelStepTags,
};
