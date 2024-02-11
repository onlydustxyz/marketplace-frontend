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

export function getInvoiceInfoProps({ isUserIndividual }: { isUserIndividual: boolean }): TInvoice.InvoiceInfoProps {
  return {
    senderInfos: {
      name: "Company Name",
      address: "Company Address",
      fiscalCode: "Company Fiscal Code",
    },
    recipientInfos: {
      name: "Wagmi",
      address: "54 Rue Du faubourg montmartre, Paris, France, 75009",
    },
    legalInfos: {
      date: getFormattedDateToLocaleDateString(new Date()),
      destinationWallets: ["Crypto Wallet", "Bank Account"],
    },
  };
}
