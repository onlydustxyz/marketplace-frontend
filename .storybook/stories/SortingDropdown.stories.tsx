import SortingDropdown from "src/_pages/Projects/Sorting/SortingDropdown";
import { PROJECT_SORTINGS, Sorting } from "src/_pages/Projects/sorting";

export default {
  title: "SortingDropdown",
  component: SortingDropdown,
};

export const Default = {
  render: () => <SortingDropdown all={PROJECT_SORTINGS} current={Sorting.Trending} onChange={Function.prototype()} />,
};
