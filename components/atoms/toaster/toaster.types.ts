import { ComponentProps, PropsWithChildren, ReactNode } from "react";

import { Icon } from "components/layout/icon/icon";

interface Variants {
  variant: "default" | "error";
}

export interface ToasterPort {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export interface ToastProps extends PropsWithChildren {
  variants: Partial<Variants>;
  iconProps?: ComponentProps<typeof Icon>;
}

export interface ToastPort {
  default: (children: ReactNode) => void;
  error: (children: ReactNode) => void;
}
