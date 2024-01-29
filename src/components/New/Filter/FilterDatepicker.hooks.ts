import { startOfMonth, startOfWeek, startOfYear } from "date-fns";

import { Period } from "src/components/New/Field/Datepicker";
import { useIntl } from "src/hooks/useIntl";

export function useDatepickerPeriods({ selectedPeriod }: { selectedPeriod?: Period }) {
  const { T } = useIntl();

  return [
    {
      id: Period.ThisWeek,
      label: T("common.periods.thisWeek"),
      value: { from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: new Date() },
      isActive: selectedPeriod === Period.ThisWeek,
    },
    {
      id: Period.ThisMonth,
      label: T("common.periods.thisMonth"),
      value: { from: startOfMonth(new Date()), to: new Date() },
      isActive: selectedPeriod === Period.ThisMonth,
    },
    {
      id: Period.ThisYear,
      label: T("common.periods.thisYear"),
      value: { from: startOfYear(new Date()), to: new Date() },
      isActive: selectedPeriod === Period.ThisYear,
    },
    {
      id: Period.AllTime,
      label: T("common.periods.allTime"),
      value: { from: new Date(0), to: new Date() },
      isActive: selectedPeriod === Period.AllTime,
    },
  ];
}
