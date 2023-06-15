import DraftLine from "src/icons/DraftLine";
import FormSelect from "./View";
import TeamLine from "src/icons/TeamLine";
import ExchangeDollarLine from "src/icons/ExchangeDollarLine";
import MoreLine from "src/icons/MoreLine";

export default {
  title: "FormSelect",
  component: FormSelect,
};

const workKinds = [
  { icon: <DraftLine />, label: "Documentation" },
  { icon: <TeamLine />, label: "Meeting" },
  { icon: <ExchangeDollarLine />, label: "Subscription" },
  { icon: <MoreLine />, label: "Other" },
];

export const Default = {
  render: () => (
    <FormSelect
      value={workKinds[0].label}
      options={workKinds}
      onChange={() => {
        return;
      }}
    />
  ),
};
