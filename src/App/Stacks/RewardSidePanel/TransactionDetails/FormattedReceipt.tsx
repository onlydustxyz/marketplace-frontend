import Tooltip from "src/components/Tooltip";
import ExternalLink from "src/components/ExternalLink";
import React from "react";
import { useIntl } from "src/hooks/useIntl";
import { components } from "src/__generated/api";
import IBAN from "iban";
import { cn } from "src/utils/cn";

interface TFormattedReceipt {
  type: "crypto" | "fiat";
  shortDetails: string;
  fullDetails: string;
  reference: string;
  link?: string;
}

function formatReceipt(receipt?: components["schemas"]["ReceiptResponse"]): TFormattedReceipt | undefined {
  if (receipt?.type === "CRYPTO") {
    const { ens, walletAddress: address = "", transactionReference: reference } = receipt;

    return {
      type: "crypto",
      shortDetails: ens ?? `0x...${address.substring(address.length - 5)}`,
      fullDetails: address,
      reference,
      link: receipt.transactionReferenceLink,
    };
  }

  if (receipt?.type === "FIAT") {
    const { iban = "", transactionReference: reference } = receipt;

    return {
      type: "fiat",
      shortDetails: `**** ${iban.substring(iban.length - 3)}`,
      fullDetails: IBAN.printFormat(iban),
      reference,
      link: receipt.transactionReferenceLink,
    };
  }
}

interface Props {
  receipt: components["schemas"]["ReceiptResponse"];
}

export function FormattedReceipt({ receipt }: Props) {
  const { T } = useIntl();
  const formattedReceipt = receipt ? formatReceipt(receipt) : null;

  if (!formattedReceipt) {
    return null;
  }

  const formatReceiptTranslate = T(`reward.table.detailsPanel.processedVia.${formattedReceipt.type}`, {
    recipient: formattedReceipt.shortDetails,
  }).split("[]");

  return (
    <>
      <div className="ml-6 font-walsheim text-sm font-normal text-greyscale-50" id="reward-payment-receipt">
        {formatReceiptTranslate.map((str, index) => (
          <span className={cn("text-greyscale-300", { "text-white": index === 1 })} key={index}>
            {str}&nbsp;
          </span>
        ))}
      </div>
      <Tooltip anchorId="reward-payment-receipt" clickable>
        <div className="flex flex-col items-start">
          <div>
            {T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt.type}.recipient`, {
              recipient: formattedReceipt.fullDetails,
            })}
          </div>

          {formattedReceipt.type === "crypto" ? (
            <ExternalLink
              url={formattedReceipt.link || `https://etherscan.io/tx/${formattedReceipt.reference}`}
              text={T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt.type}.reference`, {
                reference: formattedReceipt.reference,
              })}
            />
          ) : (
            <div>
              {T(`reward.table.detailsPanel.processedTooltip.${formattedReceipt.type}.reference`, {
                reference: formattedReceipt.reference,
              })}
            </div>
          )}
        </div>
      </Tooltip>
    </>
  );
}
