import { MeActions } from "actions/me/me.actions";
import { headers } from "next/headers";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function getHeaderProps({
  isUserIndividual,
  name,
}: {
  isUserIndividual: boolean;
  name: string;
}): TInvoice.HeaderProps {
  const someIncrementalKey = 123;
  return {
    title: isUserIndividual ? "Receipt NO:" : "Invoice NO:",
    invoiceNumber: `#OD-${name.slice(0, 5).toUpperCase()}-${someIncrementalKey}`,
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
        fiscalCode: billingProfile.fiscalCode,
      },
      ...restInfos,
    };
  } else {
    const billingProfile = await MeActions.queries.retrieveCompanyBillingProfiles({ accessToken: token ?? "" });

    return {
      senderInfos: {
        name: billingProfile.name ?? "",
        address: billingProfile.address ?? "",
      },
      ...restInfos,
    };
  }
}
