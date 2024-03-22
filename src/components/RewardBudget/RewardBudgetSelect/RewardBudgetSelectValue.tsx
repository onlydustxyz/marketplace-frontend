import { Listbox } from "@headlessui/react";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { WorkEstimationBudgetDetails } from "src/components/RewardBudget/RewardBudget.type";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { cn } from "src/utils/cn";

export interface RewardBudgetSelectValueProps {
  value: WorkEstimationBudgetDetails;
  disabled: boolean;
}

export const RewardBudgetSelectValue = ({ value, disabled }: RewardBudgetSelectValueProps) => {
  return (
    <Listbox.Button className="flex w-full flex-row items-center justify-between gap-2 rounded-2xl border border-greyscale-50/8 bg-white/5 px-4 py-3 shadow-light">
      <div className="flex flex-row items-center justify-start gap-2">
        <Chip solid>
          <CurrencyIcons currency={value.currency} className="h-4 w-4" />
        </Chip>
        <label className="font-walsheim text-base font-medium leading-4">{value.currency.name}</label>
      </div>
      <ArrowDownSLine className={cn("text-2xl leading-6 text-spaceBlue-200", disabled && "opacity-0")} />
    </Listbox.Button>
  );
};
