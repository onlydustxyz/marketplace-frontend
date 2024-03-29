import { ComponentProps } from "react";
import { DateRange } from "react-day-picker";

import { Datepicker } from "src/components/New/Field/Datepicker";
import { FilterField } from "src/components/New/Filter/FilterField";
import { useIntl } from "src/hooks/useIntl";

import { useDatepickerPeriods } from "./FilterDatepicker.hooks";

export function FilterDatepicker({
  selected,
  onChange,
  selectedPeriod,
  onPeriodChange,
}: {
  selected: DateRange;
  onChange: (value: DateRange) => void;
  selectedPeriod: NonNullable<ComponentProps<typeof Datepicker>["selectedPeriod"]>;
  onPeriodChange: NonNullable<ComponentProps<typeof Datepicker>["onPeriodChange"]>;
}) {
  const { T } = useIntl();
  const periods = useDatepickerPeriods({ selectedPeriod });

  return (
    <FilterField label={T("filter.date.title")}>
      <Datepicker
        autoCloseOnDateSelect={false}
        mode="range"
        value={selected}
        onChange={value => {
          if (value) onChange(value);
        }}
        disableFuture
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        periods={periods}
        isElevated
      />
    </FilterField>
  );
}
