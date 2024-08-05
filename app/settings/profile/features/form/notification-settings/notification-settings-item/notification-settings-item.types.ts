import { TNotificationSwitch } from "app/settings/profile/features/form/notification-settings/notification-switch/notification-switch.types";

import { TTranslate } from "components/layout/translate/translate.types";

export namespace TNotificationSettingsItem {
  interface item extends TNotificationSwitch.Props {
    label: TTranslate.Props;
    content: TTranslate.Props;
  }
  export interface Props {
    title: TTranslate.Props;
    items: item[];
  }
}
