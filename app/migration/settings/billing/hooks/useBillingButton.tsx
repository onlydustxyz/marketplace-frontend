import { ReactElement, ReactNode } from "react";

import FeedbackButton from "src/App/Layout/Header/FeedbackButton";
import { useStackVerify } from "src/App/Stacks/Stacks";
import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { MeTypes } from "src/api/me/types";
import { Key } from "src/hooks/useIntl";

export interface UseBillingButton {
  label: Key;
  onClick?: () => void;
  element?: (children: ReactNode) => ReactElement;
}

export interface UseBillingButtonProps {
  status?: UseBillingProfileResponse["status"];
  type?: MeTypes.billingProfileUnion;
  id?: string;
}
export const useBillingButton = ({ status, type, id }: UseBillingButtonProps): UseBillingButton | undefined => {
  const [openVerify] = useStackVerify();

  function handleVerify() {
    if (type && id) {
      if (type === MeTypes.billingProfileType.Individual) {
        openVerify({ levelName: "basic-kyc-level", externalId: id });
      } else {
        openVerify({ levelName: "basic-kyb-level", externalId: id });
      }
    }
  }

  function feedBack(children: React.ReactNode) {
    return <FeedbackButton customButton={children} />;
  }

  switch (status) {
    case "NOT_STARTED":
      return {
        label: "v2.pages.settings.billing.buttons.startValidation",
        onClick: handleVerify,
      };
    case "STARTED":
      return {
        label: "v2.pages.settings.billing.buttons.resumeValidation",
        onClick: handleVerify,
      };
    case "UNDER_REVIEW":
      return {
        label: "v2.pages.settings.billing.buttons.viewValidation",
        onClick: handleVerify,
      };
    case "INVALIDATED":
      return {
        label: "v2.pages.settings.billing.buttons.reValidate",
        onClick: handleVerify,
      };
    case "REJECTED":
      return {
        label: "v2.pages.settings.billing.buttons.reValidate",
        onClick: handleVerify,
      };
    case "CLOSED":
      return {
        label: "v2.pages.settings.billing.buttons.contact",
        element: feedBack,
      };
    case "VERIFIED":
      return {
        label: "v2.pages.settings.billing.buttons.contact",
        element: feedBack,
      };
    default:
      return undefined;
  }
};
