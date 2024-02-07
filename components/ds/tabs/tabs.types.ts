import { Key, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TTab } from "components/ds/tabs/tab/tab.types";
import { tabsVariants } from "components/ds/tabs/tabs.variants";

export namespace TTabs {
  export type Variants = VariantProps<typeof tabsVariants>;
  export interface Props extends PropsWithChildren, Variants, TTab.Variants {
    tabs: TTab.Props[];
    controlled?: {
      selected: Key;
      onSelect: (key: Key) => void;
    };
    mobile?: {
      title: string;
      trigger: ReactNode;
    };
  }
}
