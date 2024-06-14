import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { TIcon } from "components/layout/icon/icon.types";

import { TagCoreVariants } from "./tag.variants";

type Variants = VariantProps<typeof TagCoreVariants>;
type classNames = Partial<typeof TagCoreVariants["slots"]>;

export interface TTagProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface TTagIconProps<C extends ElementType> extends TTagProps<C> {
  icon: TIcon.Props;
}

/** TODO refactor this with new avatar */
export interface TTagAvatarProps<C extends ElementType> extends TTagProps<C> {
  avatar: TAvatar.Props;
}
