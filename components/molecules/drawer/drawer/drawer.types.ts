import { ButtonProps, ModalProps } from "@nextui-org/react";
import { HTMLProps, ReactElement } from "react";

import { TIcon } from "@/components/layout/icon/icon.types";

export namespace TDrawer {
  export interface FooterProps {
    cancelButton?: ButtonProps;
    confirmButton?: ButtonProps;
  }
  export interface HeaderProps {
    title: string;
    icon?: TIcon.Props;
  }
  export interface Props extends ModalProps {
    isFullWidth?: boolean;
    isSmall?: boolean;
    header?: HeaderProps | ReactElement;
    footer?: FooterProps;
    noPadding?: boolean;
    form?: Partial<HTMLProps<HTMLFormElement>>;
  }
}
