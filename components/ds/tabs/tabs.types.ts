import { Key, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TTab } from "components/ds/tabs/tab/tab.types";
import { tabsVariants } from "components/ds/tabs/tabs.variants";

export namespace TTabs {
  export type Variants = VariantProps<typeof tabsVariants>;
  export interface Props<T extends Key> extends PropsWithChildren, Variants, TTab.Variants {
    tabs: TTab.Props<T>[];
    controlled?: {
      selected: T;
      onSelect: (key: T) => void;
    };
    mobile?: {
      title: string;
      trigger: ReactNode;
    };
  }
}
