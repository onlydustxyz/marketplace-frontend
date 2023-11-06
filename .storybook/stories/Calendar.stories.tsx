import { SingleCalendar, MultipleCalendar, RangeCalendar } from "src/components/New/Calendar";

export default {
  title: "Calendar",
  component: SingleCalendar,
};

export const Default = {
  render: (args: typeof SingleCalendar) => (
    <div className="w-80 bg-red-500">
      <SingleCalendar />
    </div>
  ),
};

export const Single = {
  render: (args: typeof SingleCalendar) => (
    <div className="w-80 bg-red-500">
      <SingleCalendar />
    </div>
  ),
};

export const Multiple = {
  render: (args: typeof MultipleCalendar) => (
    <div className="w-80 bg-red-500">
      <MultipleCalendar />
    </div>
  ),
};

export const Range = {
  render: (args: typeof RangeCalendar) => (
    <div className="w-80 bg-red-500">
      <RangeCalendar />
    </div>
  ),
};
