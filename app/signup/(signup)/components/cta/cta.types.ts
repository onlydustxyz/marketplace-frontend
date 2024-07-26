import { ComponentProps } from "react";

import { Paper } from "components/atoms/paper";
import { Icon } from "components/layout/icon/icon";

import { Key } from "hooks/translate/use-translate";

export namespace TCta {
  type IconProps = ComponentProps<typeof Icon>;
  type PaperProps = ComponentProps<typeof Paper>;

  export interface Props {
    title: Key;
    subtitle: Key;
    iconProps: Omit<IconProps, "size" | "remixName"> & { remixName: NonNullable<IconProps["remixName"]> };
    wrapperProps?: Omit<PaperProps, "size" | "container">;
  }
}
