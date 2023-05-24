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
        "flex flex-row justify-center items-center w-fit shrink-0",
        "font-walsheim drop-shadow-bottom-sm font-medium text-greyscale-50",
        "drop-shadow-bottom-sm",
        "text-sm h-8 gap-2 rounded-large px-4 py-2",
        "backdrop-blur-lg border",
        "cursor-pointer select-none",
        "hover:text-spacePurple-100 hover:border-spacePurple-200",
        {
          "text-spacePurple-200 bg-spacePurple-900 border-spacePurple-400": enabled,
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
