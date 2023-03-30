import { Switch } from "@headlessui/react";

type Props = {
  checked: boolean;
  label: string;
  onChange?(checked: boolean): void;
};

const View = ({ checked, label, onChange }: Props) => (
  <div className="flex font-walsheim font-normal text-sm gap-2 text-grayscale-50">
    <Switch
      checked={checked}
      onChange={onChange}
      className={`flex ${
        checked
          ? "bg-spacePurple-500 border border-spacePurple-500 hover:bg-spacePurple-600 hover:border-spacePurple-600"
          : "bg-white/[0.08] border border-white/0 hover:border hover:border-greyscale-50/[0.08]"
      } h-5 w-9 items-center px-px rounded-full transition duration-300`}
    >
      <span
        className={`h-4 w-4 transform rounded-full bg-greyscale-50 transition duration-300 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </Switch>
    <span>{label}</span>
  </div>
);

export default View;
