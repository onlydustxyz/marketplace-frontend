import { ReactElement } from "react";

import { TTranslate } from "components/layout/translate/translate.types";

export namespace TNotificationSettingsItem {
  interface item {
    label: TTranslate.Props;
    content: TTranslate.Props;
    switch: [ReactElement, ReactElement];
  }
  export interface Props {
    title: TTranslate.Props;
    items: item[];
  }
}
