import { ComponentProps } from "react";
import { DateRange } from "react-day-picker";

import { Datepicker } from "src/components/New/Field/Datepicker";
import { useIntl } from "src/hooks/useIntl";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { TFilterFieldContainer } from "components/ds/Filters/field-container/field-container.types";

import { useDatepickerPeriods } from "./FilterDatepicker.hooks";

export function FilterDatepicker({
  selected,
  onChange,
  selectedPeriod,
  onPeriodChange,
  hideLabel,
}: {
  selected: DateRange;
  onChange: (value: DateRange) => void;
  selectedPeriod: NonNullable<ComponentProps<typeof Datepicker>["selectedPeriod"]>;
  onPeriodChange: NonNullable<ComponentProps<typeof Datepicker>["onPeriodChange"]>;
  hideLabel?: TFilterFieldContainer.Props["hideLabel"];
}) {
  const { T } = useIntl();
  const periods = useDatepickerPeriods({ selectedPeriod });

  return (
    <FilterFieldContainer label={T("filter.date.title")} hideLabel={hideLabel}>
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
    </FilterFieldContainer>
  );
}
