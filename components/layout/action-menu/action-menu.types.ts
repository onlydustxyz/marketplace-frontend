import { PropsWithChildren, ReactNode } from "react";

export namespace TActionMenu {
  interface ActionItem {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  }

  export interface Props extends PropsWithChildren {
    className?: string;
    disabled?: boolean;
    actions: ActionItem[];
  }
}
