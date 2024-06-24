import { ComponentProps, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { Avatar } from "components/atoms/avatar";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";
import { TIcon } from "components/layout/icon/icon.types";
import { TTranslate } from "components/layout/translate/translate.types";

interface Variants {
  size: "xs" | "s" | "m";
  shape: "round" | "square";
  hideText: boolean;
  style: "fill" | "outline";
  isDeletable: boolean;
  color: "black" | "white" | "red" | "pink" | "grey" | "green" | "yellow" | "orange" | "purple" | "blue";
}

interface ClassNames {
  base: string;
  content: string;
  label: string;
  deletableIcon: string;
}

export interface TagPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: TTranslate.Props;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelProps?: Partial<ComponentProps<typeof Typo>>;
  deletableIconProps?: Partial<ComponentProps<typeof Icon>>;
}

export interface TTagIconProps<C extends ElementType> extends TagPort<C> {
  icon: TIcon.Props;
}

export interface TTagAvatarProps<C extends ElementType> extends TagPort<C> {
  avatar: ComponentProps<typeof Avatar>;
}
