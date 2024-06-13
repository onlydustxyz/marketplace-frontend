import { ComponentProps, ReactNode } from "react";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export namespace TSectionHeader {
  export interface Props {
    iconProps: ComponentProps<typeof Icon>;
    titleProps: Omit<ComponentProps<typeof Typography>, "variant">;
    subtitleProps?: Omit<ComponentProps<typeof Typography>, "variant" | "className">;
    rightContent?: ReactNode;
  }
}
