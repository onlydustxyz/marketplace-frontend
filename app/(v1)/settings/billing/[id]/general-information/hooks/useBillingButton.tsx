import { ReactElement, ReactNode } from "react";

import { SUMSUB_CONST } from "app/api/sumsub-token/constants";

import { useStackFeedback, useStackVerify } from "src/App/Stacks/Stacks";
import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { MeTypes } from "src/api/me/types";

import { Key } from "hooks/translate/use-translate";

export interface UseBillingButton {
  label: Key;
  onClick?: () => void;
  element?: (children: ReactNode) => ReactElement;
}

export interface UseBillingButtonProps {
  status?: UseGetBillingProfileById["status"];
  type?: MeTypes.billingProfileUnion;
  id?: string;
}
export const useBillingButton = ({ status, type, id }: UseBillingButtonProps): UseBillingButton | undefined => {
  const [openVerify] = useStackVerify();
  const [openFeedback] = useStackFeedback();

  function handleVerify() {
    if (type && id) {
      if (type === MeTypes.billingProfileType.Individual) {
        openVerify({ levelName: SUMSUB_CONST.KYC_LEVEL, externalId: id });
      } else {
        openVerify({ levelName: SUMSUB_CONST.KYB_LEVEL, externalId: id });
      }
    }
  }

  switch (status) {
    case "NOT_STARTED":
      return {
        label: "v2.pages.settings.billing.information.buttons.startValidation",
        onClick: handleVerify,
      };
    case "STARTED":
      return {
        label: "v2.pages.settings.billing.information.buttons.resumeValidation",
        onClick: handleVerify,
      };
    case "UNDER_REVIEW":
      return {
        label: "v2.pages.settings.billing.information.buttons.viewValidation",
        onClick: handleVerify,
      };
    case "REJECTED":
      return {
        label: "v2.pages.settings.billing.information.buttons.reValidate",
        onClick: handleVerify,
      };
    case "CLOSED":
      return {
        label: "v2.pages.settings.billing.information.buttons.contact",
        onClick: openFeedback,
      };
    case "VERIFIED":
      return {
        label: "v2.pages.settings.billing.information.buttons.contact",
        onClick: openFeedback,
      };
    default:
      return undefined;
  }
};
