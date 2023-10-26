import { FC, useMemo } from "react";
import { Chip } from "src/components/Chip/Chip";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { Currency } from "src/types";
import { CurrencyIcons } from "./CurrencyIcon";
import { Chips } from "src/components/Chips/Chips";
import { BudgetCurrencyType, formatMoneyAmount } from "src/utils/money";
import { useIntl } from "src/hooks/useIntl";

// TODO : doc
/**
 * Used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-[…]ype=design&node-id=8306-28771&mode=design&t=zDkHPxvit6rCDHmj-4
 */

export interface AvailableConversionCurrency {
  currency: BudgetCurrencyType;
  amount: number;
  dollar: number | undefined;
}

export type AvailableConversion = {
  tooltipId?: string;
  currencies: AvailableConversionCurrency[];
  withWrapper?: boolean;
  numberCurencyToShow?: number;
} & (AvailableConversionCompact | AvailableConversionFull | AvailableConversionLight);

type AvailableConversionCompact = {
  type: "compact";
  totalAmount: number;
};
type AvailableConversionFull = {
  type: "full";
  totalAmount: number;
  dollar: number;
};
type AvailableConversionLight = {
  type: "light";
};

export const AvailableConversion: FC<AvailableConversion> = ({
  tooltipId,
  currencies,
  withWrapper,
  numberCurencyToShow = 3,
  ...variant
}) => {
  const { T } = useIntl();
  const tooltipIdProps = tooltipId && !withWrapper ? { "data-tooltip-id": tooltipId } : {};

  return (
    <>
      <div {...tooltipIdProps} className="flex flex-row items-center justify-start gap-1">
        <Chips number={numberCurencyToShow}>
          {currencies.map(currency => (
            <div key={currency.currency}>
              <Chip solid>
                <CurrencyIcons currency={currency.currency} className="h-4 w-4" />
              </Chip>
            </div>
          ))}
        </Chips>
        {(variant.type === "full" || variant.type === "compact") && variant.totalAmount ? (
          <p className="font-walsheim text-sm font-bold leading-[14px]">
            {formatMoneyAmount({ amount: variant.totalAmount, currency: Currency.USD })}
          </p>
        ) : null}
        {variant.type === "full" && variant.dollar ? (
          <p className="font-walsheim text-[10px] text-spaceBlue-200">
            {`~${formatMoneyAmount({ amount: variant.dollar, currency: Currency.USD })}`}
          </p>
        ) : null}
      </div>
      {tooltipId && (
        <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
          <div className="flex flex-col gap-2">
            <p className="font-walsheim text-sm font-medium text-white">{T("availableConversion.tooltip.title")}</p>
            <div className="flex flex-col gap-1">
              {currencies.map(currency => (
                <div key={currency.currency} className="flex items-center justify-start gap-1">
                  <Chip>
                    <CurrencyIcons currency={currency.currency} className="h-4 w-4" />
                  </Chip>
                  <div key={currency.currency} className="flex items-center justify-start gap-[2px]">
                    <p className="font-walsheim text-xs text-white">
                      {formatMoneyAmount({ amount: currency.amount, currency: currency.currency })}
                    </p>
                    {currency.currency !== Currency.USD && (
                      <p className="font-walsheim text-[10px] text-spaceBlue-200">
                        {currency.dollar
                          ? `~${formatMoneyAmount({ amount: currency.dollar, currency: Currency.USD })}`
                          : T("availableConversion.tooltip.na")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tooltip>
      )}
    </>
  );
};
