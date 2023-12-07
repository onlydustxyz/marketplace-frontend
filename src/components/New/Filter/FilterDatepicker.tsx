import { startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { DateRange } from "react-day-picker";
import { Datepicker } from "src/components/New/Field/Datepicker";
import { useIntl } from "src/hooks/useIntl";
import { FilterLabel } from "./FilterLabel";

export default function FilterDatepicker({
  selected,
  onChange,
}: {
  selected: DateRange;
  onChange: (value: DateRange) => void;
}) {
  const { T } = useIntl();

  return (
    <FilterLabel label={T("filter.date.title")}>
      <Datepicker
        mode="range"
        value={selected}
        onChange={value => {
          if (value) onChange(value);
        }}
        periods={[
          {
            label: T("common.periods.thisWeek"),
            value: { from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: new Date() },
          },
          {
            label: T("common.periods.thisMonth"),
            value: { from: startOfMonth(new Date()), to: new Date() },
          },
          {
            label: T("common.periods.thisYear"),
            value: { from: startOfYear(new Date()), to: new Date() },
          },
          {
            label: T("common.periods.allTime"),
            value: { from: new Date(0), to: new Date() },
          },
        ]}
        isElevated
      />
    </FilterLabel>
  );
}
