import { MeActions } from "actions/me/me.actions";
import { headers } from "next/headers";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function getHeaderProps({
  isUserIndividual,
  id,
  incrementalKey,
}: {
  isUserIndividual: boolean;
  id: number;
  incrementalKey: number;
}): TInvoice.HeaderProps {
  return {
    title: isUserIndividual ? "Receipt NO:" : "Invoice NO:",
    invoiceNumber: `#OD-${id}-${incrementalKey}`,
  };
}

export async function getInvoiceInfoProps({
  isUserIndividual,
}: {
  isUserIndividual: boolean;
}): Promise<TInvoice.InvoiceInfoProps> {
  const headersList = headers();
  const token = headersList.get("authorization");

  const restInfos = {
    recipientInfos: {
      name: "Wagmi",
      address: "54 Rue Du faubourg montmartre, Paris, France, 75009",
    },
    legalInfos: {
      date: getFormattedDateToLocaleDateString(new Date()),
      destinationWallets: ["Crypto Wallet", "Bank Account"],
    },
  };

  if (isUserIndividual) {
    const billingProfile = await MeActions.queries.retrieveIndividualBillingProfiles({ accessToken: token ?? "" });
    return {
      senderInfos: {
        name: `${billingProfile.firstName} ${billingProfile.lastName}`,
        address: billingProfile.address ?? "",
      },
      ...restInfos,
    };
  } else {
    const billingProfile = await MeActions.queries.retrieveCompanyBillingProfiles({ accessToken: token ?? "" });
    console.log(billingProfile);
    return {
      senderInfos: {
        name: billingProfile.name ?? "",
        address: billingProfile.address ?? "",
        euVATNumber: billingProfile.euVATNumber,
      },
      ...restInfos,
    };
  }
}
