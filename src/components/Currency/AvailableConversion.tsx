import { FC } from "react";
import { Chip } from "src/components/Chip/Chip";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { Currency } from "src/types";
import { CurrencyIcons } from "./CurrencyIcon";
import { Chips } from "src/components/Chips/Chips";
import { BugetCurrencyType, formatMoneyAmount } from "src/utils/money";
import { useIntl } from "src/hooks/useIntl";

// TODO : doc
/**
 * Used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-[…]ype=design&node-id=8306-28771&mode=design&t=zDkHPxvit6rCDHmj-4
 */

export interface AvailableConversionCurrency {
  currency: BugetCurrencyType;
  amount: number;
  dollar: number | undefined;
}

export interface AvailableConversion {
  tooltipId?: string;
  currencies: AvailableConversionCurrency[];
}

export const AvailableConversion: FC<AvailableConversion> = ({ tooltipId, currencies }) => {
  const { T } = useIntl();
  const tooltipIdProps = tooltipId ? { "data-tooltip-id": tooltipId } : {};
  return (
    <>
      <div {...tooltipIdProps}>
        <Chips number={2}>
          {currencies.map(currency => (
            <div key={currency.currency}>
              <Chip solid>
                <CurrencyIcons currency={currency.currency} className="h-4 w-4" />
              </Chip>
            </div>
          ))}
        </Chips>
      </div>
      {tooltipId && (
        <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
          <div className="flex flex-col gap-2">
            <p className="font-walsheim text-sm font-medium text-white">{T("availableConversion.tooltip.title")}</p>
            <div>
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
