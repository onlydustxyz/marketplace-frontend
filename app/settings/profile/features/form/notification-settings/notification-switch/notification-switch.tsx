import { Switch } from "components/atoms/switch";
import { Tooltip } from "components/atoms/tooltip";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TNotificationSwitch } from "./notification-switch.types";

export function NotificationSwitch({ label, value, onChange, info, isDisabled = false }: TNotificationSwitch.Props) {
  return (
    <div className="flex h-auto w-44 flex-col items-end justify-start gap-1">
      {label && (
        <div className="w-fit flex-row items-center justify-end">
          <Typography variant={"body-s-bold"} translate={label} />
          {!!info && (
            <Tooltip content={<Translate {...info} />}>
              <Icon remixName={"ri-info-i-line"} />
            </Tooltip>
          )}
        </div>
      )}
      <Switch isActive={value} onChange={onChange} isDisabled={isDisabled} />
    </div>
  );
}
