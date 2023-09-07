import { ReactElement } from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

type Props = {
  testId?: string;
  label?: string;
  icon?: ReactElement;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

const Toggle: React.FC<Props> = ({ testId, label, icon, enabled, setEnabled }) => {
  return (
    <Switch
      data-testid={testId}
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        "flex w-fit shrink-0 flex-row items-center justify-center",
        "font-walsheim font-medium text-greyscale-50 drop-shadow-bottom-sm",
        "drop-shadow-bottom-sm",
        "h-8 gap-2 rounded-large px-4 py-2 text-sm",
        "border",
        "cursor-pointer select-none",
        "hover:border-spacePurple-200 hover:text-spacePurple-100",
        {
          "border-spacePurple-400 bg-spacePurple-900 text-spacePurple-200": enabled,
          "bg-white/5": !enabled,
        }
      )}
    >
      {icon}
      {label}
    </Switch>
  );
};

export default Toggle;
