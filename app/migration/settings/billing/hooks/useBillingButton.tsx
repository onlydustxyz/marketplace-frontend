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
  type?: `${MeTypes.billingProfileType}`;
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

  if (status === "NOT_STARTED") {
    return {
      label: "v2.pages.settings.billing.buttons.startValidation",
      onClick: handleVerify,
    };
  }

  if (status === "STARTED") {
    return {
      label: "v2.pages.settings.billing.buttons.resumeValidation",
      onClick: handleVerify,
    };
  }

  if (status === "UNDER_REVIEW") {
    return {
      label: "v2.pages.settings.billing.buttons.viewValidation",
      onClick: handleVerify,
    };
  }

  if (status === "INVALIDATED") {
    return {
      label: "v2.pages.settings.billing.buttons.reValidate",
      onClick: handleVerify,
    };
  }
  if (status === "CLOSED") {
    return {
      label: "v2.pages.settings.billing.buttons.contact",
      element: feedBack,
    };
  }
  if (status === "VERIFIED") {
    return {
      label: "v2.pages.settings.billing.buttons.contact",
      element: feedBack,
    };
  }

  return undefined;
};
