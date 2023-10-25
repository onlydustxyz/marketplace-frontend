import { FC } from "react";
import { Chip } from "src/components/Chip/Chip";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { cn } from "src/utils/cn";
import StarknetIcon from "src/assets/icons/Starknet";
import { Currency } from "src/types";
import { CurrencyIcons } from "./CurrencyIcon";
import { Chips } from "src/components/Chips/Chips";
// TODO : doc
/**
 * Used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-[…]ype=design&node-id=8306-28771&mode=design&t=zDkHPxvit6rCDHmj-4
 */

interface AvailableConversionCurrency {
  currency: Currency;
  amount: number;
  dollar: number | null;
}

export interface AvailableConversion {
  tooltipId?: string;
  currencies: AvailableConversionCurrency[];
}

export const AvailableConversion: FC<AvailableConversion> = ({ tooltipId, currencies }) => {
  const tooltipIdProps = tooltipId ? { "data-tooltip-id": tooltipId } : {};
  return (
    <>
      <div {...tooltipIdProps}>
        <Chips number={4}>
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
          <div>
            <Chip>
              <StarknetIcon className="h-4" />
            </Chip>
            <div>C2</div>
          </div>
        </Tooltip>
      )}
    </>
  );
};
