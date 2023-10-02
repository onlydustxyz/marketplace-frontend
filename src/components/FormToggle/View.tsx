import { Switch } from "@headlessui/react";

type Props = {
  checked: boolean;
  label?: string;
  onChange?(checked: boolean): void;
};

const View = ({ checked, label, onChange }: Props) => (
  <div className="text-grayscale-50 flex gap-2 font-walsheim text-sm font-normal">
    <Switch
      checked={checked}
      onChange={onChange}
      className={`flex ${
        checked
          ? "border border-spacePurple-500 bg-spacePurple-500 hover:border-spacePurple-600 hover:bg-spacePurple-600"
          : "border border-white/0 bg-white/[0.08] hover:border hover:border-greyscale-50/[0.08]"
      } h-5 w-9 items-center rounded-full px-px transition duration-300`}
    >
      <span
        className={`h-4 w-4 transform rounded-full bg-greyscale-50 transition duration-300 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </Switch>
    {label && <span>{label}</span>}
  </div>
);

export default View;
