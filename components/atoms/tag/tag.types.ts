import { ComponentProps, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { AvatarPort } from "components/atoms/avatar";
import { TypoPort } from "components/atoms/typo";
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

export interface TagBasePort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: TTranslate.Props;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelProps?: Partial<TypoPort<"span">>;
  deletableIconProps?: Partial<ComponentProps<typeof Icon>>;
}

export interface TagIconPort<C extends ElementType> extends TagBasePort<C> {
  icon: TIcon.Props;
}

export interface TagAvatarPort<C extends ElementType> extends TagBasePort<C> {
  avatar: AvatarPort;
}

export type TagPort<C extends ElementType> = TagBasePort<C> | TagIconPort<C> | TagAvatarPort<C>;

export function isTagAvatarPort<C extends ElementType>(
  tag: TagAvatarPort<C> | TagIconPort<C> | TagPort<C>
): tag is TagAvatarPort<C> {
  return (tag as TagAvatarPort<C>).avatar !== undefined;
}

export function isTagIconPort<C extends ElementType>(
  tag: TagAvatarPort<C> | TagIconPort<C> | TagPort<C>
): tag is TagIconPort<C> {
  return (tag as TagIconPort<C>).icon !== undefined;
}
