import { ComponentProps, PropsWithChildren, ReactNode } from "react";

import { Icon } from "components/layout/icon/icon";

import { Key } from "hooks/translate/use-translate";

export namespace TTableContainer {
  type BaseProps = PropsWithChildren<{
    title: Key;
    description: Key;
  }>;

  type IconNodeProps = BaseProps & {
    icon: ReactNode;
    iconProps?: never;
  };

  type IconObjectProps = BaseProps & {
    icon?: never;
    iconProps: ComponentProps<typeof Icon>;
  };

  export type Props = IconNodeProps | IconObjectProps;
}
