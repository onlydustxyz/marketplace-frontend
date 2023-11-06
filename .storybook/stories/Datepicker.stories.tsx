import { Datepicker } from "src/components/New/Field/Datepicker";

export default {
  title: "Datepicker",
  component: Datepicker,
};

export const Default = {
  render: (args: typeof Datepicker) => (
    <div className="w-60">
      <Datepicker mode="single" />
    </div>
  ),
};
