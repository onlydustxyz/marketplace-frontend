import { TTranslate } from "components/layout/translate/translate.types";

export namespace TNotificationSwitch {
  export interface Props {
    isDisabled?: boolean;
    label?: TTranslate.Props;
    info?: TTranslate.Props;
    value: boolean;
    onChange: (value: boolean) => void;
  }
}
