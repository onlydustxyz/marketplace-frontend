import { PropsWithChildren, ReactNode } from "react";

import { Key } from "src/hooks/useIntl";

import { TBillingCreateStack } from "components/features/stacks/billing-create-stack/billing-create-stack.types";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TCheckboxItem {
  export interface Props extends PropsWithChildren {
    selected: boolean;
    disabled: boolean;
    icon: TIcon.Props;
    title: ReactNode;
    list: ReactNode[];
    onChange: (value: TBillingCreateStack.Choice) => void;
    value: TBillingCreateStack.Choice;
    withInput?: {
      value: string;
      onChange: (value: string) => void;
      label: string;
      placeholder: string;
    };
    withSelectedComponent?: ReactNode;
    unselectable?: boolean;
    tooltipToken?: Key;
  }
}
