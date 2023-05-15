import SortingDropdown from ".";
import { PROJECT_SORTINGS, Sorting } from "..";

export default {
  title: "SortingDropdown",
  component: SortingDropdown,
};

export const Default = {
  render: () => (
    <SortingDropdown all={PROJECT_SORTINGS} current={Sorting.MoneyGranted} onChange={Function.prototype()} />
  ),
};
