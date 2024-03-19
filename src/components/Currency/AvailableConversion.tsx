import { FC, useMemo } from "react";
import { Money } from "utils/Money";

import { Chip } from "src/components/Chip/Chip";
import { Chips } from "src/components/Chips/Chips";
import Tooltip from "src/components/Tooltip";
import { TooltipPosition } from "src/components/Tooltip";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

import { CurrencyIcons } from "./CurrencyIcon";

export interface AvailableConversionCurrency {
  currency: Money.Currency;
  amount: number | undefined;
  dollar: number | undefined;
}

export type AvailableConversion = {
  tooltipId?: string;
  currencies?: AvailableConversionCurrency[];
  currency?: AvailableConversionCurrency;
  totalAmount?: number;
  numberCurencyToShow?: number;
  sizeClassName?: string;
};

const ConversionAmount = ({ amount, currency }: { amount: number | undefined; currency?: Money.Currency }) => {
  if (!amount) {
    return null;
  }

  return <p className="text-body-s leading-[14px]">{Money.format({ amount, currency }).string}</p>;
};

const ConversionDollar = ({ dollar }: { dollar: number | undefined }) => {
  if (!dollar) {
    return null;
  }

  return (
    <p className="font-walsheim text-xs text-spaceBlue-200">
      {`~${Money.format({ amount: dollar, currency: Money.USD }).string}`}
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
              <div key={currency.currency.id} className="flex items-center justify-start gap-1">
                <Chip>
                  <CurrencyIcons currency={currency.currency} className="h-4 w-4" />
                </Chip>
                <div key={currency.currency.id} className="flex items-center justify-start gap-[2px]">
                  <p className="font-walsheim text-xs text-white">
                    {Money.format({ amount: currency.amount || 0, currency: currency.currency }).string}
                  </p>
                  {!Money.isUsd(currency.currency) && (
                    <p className="font-walsheim text-xs text-spaceBlue-200">
                      {currency.dollar
                        ? `~${Money.format({ amount: currency.dollar, currency: Money.USD })}`
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
  sizeClassName,
}) => {
  const orderedCurrencies = useCurrenciesOrder({ currencies });

  const tooltipIdProps = useMemo(() => {
    const props: { "data-tooltip-id"?: string; "data-tooltip-hidden"?: boolean } = {};

    if (tooltipId) {
      props["data-tooltip-id"] = tooltipId;
    }

    /** if we have only one currency and the she is USD don't show the tooltips */
    if (!orderedCurrencies && currency) {
      props["data-tooltip-hidden"] = Money.isUsd(currency?.currency) || !currency.dollar;
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
      <div
        {...(orderedCurrencies.length ? tooltipIdProps : {})}
        className="flex flex-row items-center justify-start gap-1"
      >
        <Chips number={numberCurencyToShow} className={sizeClassName}>
          {currencyArray?.map(currency => (
            <div key={currency.currency.id}>
              <Chip solid className={sizeClassName}>
                <CurrencyIcons currency={currency.currency} className={cn("h-4 w-4", sizeClassName)} />
              </Chip>
            </div>
          ))}
        </Chips>
        <ConversionAmount amount={totalAmount || currency?.amount} currency={currency?.currency} />
        <div {...(currency ? tooltipIdProps : {})}>
          <ConversionDollar dollar={!Money.isUsd(currency?.currency) ? currency?.dollar : undefined} />
        </div>
      </div>
      {!Money.isUsd(currency?.currency) ? (
        <ConversionTooltip tooltipId={tooltipId} currencies={orderedCurrencies} />
      ) : null}
    </>
  );
};
