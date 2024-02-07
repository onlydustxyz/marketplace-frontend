import { TabItemProps } from "@nextui-org/react";
import { Key, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TIcon } from "components/layout/icon/icon.types";

import { tabVariants } from "./tab.variants";

export namespace TTab {
  export type Variants = VariantProps<typeof tabVariants>;
  export type BaseProps = Omit<TabItemProps, "color" | "children">;

  export interface Props extends Variants, BaseProps {
    icon?: TIcon.Props;
    content: ReactNode;
    key: Key;
    children?: (selected: Key) => ReactNode;
  }
}
