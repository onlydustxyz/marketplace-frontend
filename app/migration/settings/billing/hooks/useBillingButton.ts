import { useStackVerify } from "src/App/Stacks/Stacks";
import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { MeTypes } from "src/api/me/types";
import { Key } from "src/hooks/useIntl";

export interface UseBillingButton {
  label: Key;
  onClick: () => void;
}

export interface UseBillingButtonProps {
  status?: UseBillingProfileResponse["status"];
  type?: `${MeTypes.billingProfileType}`;
  id?: string;
}
export const useBillingButton = ({ status, type, id }: UseBillingButtonProps): UseBillingButton | undefined => {
  const [openVerify] = useStackVerify();

  if (status === "NOT_STARTED" && type && id) {
    return {
      label: "v2.pages.settings.billing.buttons.startValidation",
      onClick: () => {
        if (type === MeTypes.billingProfileType.Individual) {
          openVerify({ levelName: "basic-kyc-level", externalId: id });
        } else {
          openVerify({ levelName: "basic-kyb-level", externalId: id });
        }
      },
    };
  }

  if (status === "STARTED" && type && id) {
    return {
      label: "v2.pages.settings.billing.buttons.resumeValidation",
      onClick: () => {
        if (type === MeTypes.billingProfileType.Individual) {
          openVerify({ levelName: "basic-kyc-level", externalId: id });
        } else {
          openVerify({ levelName: "basic-kyb-level", externalId: id });
        }
      },
    };
  }

  return {
    label: "",
    onClick: () => {},
  };
};
