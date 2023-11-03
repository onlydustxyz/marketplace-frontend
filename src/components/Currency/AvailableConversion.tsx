import { FC, useMemo } from "react";
import { Chip } from "src/components/Chip/Chip";
import { Currency } from "src/types";
import { CurrencyIcons } from "./CurrencyIcon";
import { Chips } from "src/components/Chips/Chips";
import { BudgetCurrencyType, formatMoneyAmount } from "src/utils/money";
import { useIntl } from "src/hooks/useIntl";
import Tooltip from "src/components/Tooltip";
import { TooltipPosition } from "src/components/Tooltip";
import { cn } from "src/utils/cn";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";

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
  currencies?: AvailableConversionCurrency[];
  currency?: AvailableConversionCurrency;
  totalAmount?: number;
  numberCurencyToShow?: number;
};

const ConversionAmount = ({ amount, currency }: { amount: number | undefined; currency?: BudgetCurrencyType }) => {
  if (!amount) {
    return null;
  }

  return (
    <p className="text-body-s leading-[14px]">
      {formatMoneyAmount({ amount: amount, currency: currency || Currency.USD })}
    </p>
  );
};

const ConversionDollar = ({ dollar }: { dollar: number | undefined }) => {
  if (!dollar) {
    return null;
  }

  return (
    <p className="font-walsheim text-xs text-spaceBlue-200">
      {`~${formatMoneyAmount({ amount: dollar, currency: Currency.USD })}`}
    </p>
  );
};

const ConversionTooltip = ({
  tooltipId,
  currencies,
}: {
  tooltipId: string | undefined;
  currencies?: AvailableConversionCurrency[];
}) => {
  const { T } = useIntl();

  if (!tooltipId) {
    return null;
  }
  return (
    <Tooltip id={tooltipId} clickable position={TooltipPosition.Bottom}>
      <div className="flex flex-col gap-2">
        <p className={cn("text-greyscale-50", currencies && "font-medium")}>{T("availableConversion.tooltip.title")}</p>
        {currencies && currencies.length > 0 && (
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
                    <p className="font-walsheim text-xs text-spaceBlue-200">
                      {currency.dollar
                        ? `~${formatMoneyAmount({ amount: currency.dollar, currency: Currency.USD })}`
                        : T("availableConversion.tooltip.na")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export const AvailableConversion: FC<AvailableConversion> = ({
  tooltipId,
  currencies,
  numberCurencyToShow = 3,
  currency,
  totalAmount,
}) => {
  const orderedCurrencies = useCurrenciesOrder({ currencies: currencies });

  const tooltipIdProps = useMemo(() => {
    const props: { "data-tooltip-id"?: string; "data-tooltip-hidden"?: boolean } = {};

    if (tooltipId) {
      props["data-tooltip-id"] = tooltipId;
    }

    /** if we have only one currency and the she is USD don't show the tooltips */
    if (!orderedCurrencies && currency) {
      props["data-tooltip-hidden"] = currency.currency === Currency.USD || !currency.dollar;
    }

    return props;
  }, [currency, orderedCurrencies]);

  const currencyArray = useMemo(() => {
    if (currencies) return orderedCurrencies;

    if (currency) {
      return [currency];
    }

    return [];
  }, [orderedCurrencies, currencies]);

  return (
    <>
      <div {...(orderedCurrencies ? tooltipIdProps : {})} className="flex flex-row items-center justify-start gap-1">
        <Chips number={numberCurencyToShow}>
          {currencyArray?.map(currency => (
            <div key={currency.currency}>
              <Chip solid>
                <CurrencyIcons currency={currency.currency} className="h-4 w-4" />
              </Chip>
            </div>
          ))}
        </Chips>
        <ConversionAmount amount={totalAmount || currency?.amount} currency={currency?.currency} />
        <div {...(currency ? tooltipIdProps : {})}>
          <ConversionDollar dollar={currency?.currency !== Currency.USD ? currency?.dollar : undefined} />
        </div>
      </div>
      <ConversionTooltip tooltipId={tooltipId} currencies={orderedCurrencies} />
    </>
  );
};
