import { Switch } from "components/atoms/switch";
import { Typography } from "components/layout/typography/typography";

import { TNotificationSwitch } from "./notification-switch.types";

export function NotificationSwitch({ label, value, onChange, isDisabled = false }: TNotificationSwitch.Props) {
  return (
    <div className="flex h-auto w-48 flex-col items-end justify-start gap-1">
      {label && (
        <div className="w-fit flex-row items-center justify-end">
          <Typography variant={"body-s-bold"} translate={label} />
        </div>
      )}
      <Switch isActive={value} onChange={onChange} isDisabled={isDisabled} />
    </div>
  );
}
