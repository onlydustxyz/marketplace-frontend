import { Datepicker } from "src/components/New/Field/Datepicker";

export default {
  title: "Datepicker",
  component: Datepicker,
};

export const Default = {
  render: () => (
    <div className="w-60">
      <Datepicker mode="single" value={new Date()} onChange={Function.prototype()} />
    </div>
  ),
};
