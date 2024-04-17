import { SortDescriptor } from "@nextui-org/react";
import { DateRange } from "react-day-picker";

import { Period } from "src/components/New/Field/Datepicker";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TSponsorHistoryTable {
  export interface Filters {
    dateRange?: DateRange;
    period?: Period;
    types?: TSelectAutocomplete.Item[];
    projects?: TSelectAutocomplete.Item[];
    currencies?: TSelectAutocomplete.Item[];
    sort?: SortDescriptor["column"];
    direction?: SortDescriptor["direction"];
  }
}
