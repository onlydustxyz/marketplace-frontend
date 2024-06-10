import { PropsWithChildren } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TJourney {
  export interface JourneyItemProps {
    stepName: string;
    completion: boolean;
  }
  export interface JourneyPrivateProps extends PropsWithChildren {}

  export const stepMapping: Record<string, RemixIconsName> = {
    step1: "ri-building-line",
    step2: "ri-stack-line",
    step3: "ri-medal-2-fill",
    step4: "ri-user-line",
    step5: "ri-send-plane-2-line",
  };
}
