import { Calendar } from "src/components/New/Calendar";

export default {
  title: "Calendar",
  component: Calendar,
};

export const Default = {
  render: () => (
    <div className="w-80">
      <Calendar mode="single" />
    </div>
  ),
};

export const Single = {
  render: () => (
    <div className="w-80">
      <Calendar mode="single" />
    </div>
  ),
};

export const Multiple = {
  render: () => (
    <div className="w-80">
      <Calendar mode="multiple" />
    </div>
  ),
};

export const Range = {
  render: () => (
    <div className="w-80">
      <Calendar mode="range" />
    </div>
  ),
};
