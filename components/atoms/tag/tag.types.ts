import { ComponentProps, ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { TAvatar } from "components/ds/avatar/avatar.types";
import { Icon } from "components/layout/icon/icon";
import { TIcon } from "components/layout/icon/icon.types";
import { TTranslate } from "components/layout/translate/translate.types";

import { TagCoreVariants } from "./tag.variants";

type Variants = VariantProps<typeof TagCoreVariants>;
type classNames = Partial<typeof TagCoreVariants["slots"]>;

export interface TTagProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  translate?: TTranslate.Props;
  as?: C;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelProps?: Partial<ComponentProps<typeof Typo>>;
  deletableIconProps?: Partial<ComponentProps<typeof Icon>>;
}

export interface TTagIconProps<C extends ElementType> extends TTagProps<C> {
  icon: TIcon.Props;
}

/** TODO refactor this with new avatar */
export interface TTagAvatarProps<C extends ElementType> extends TTagProps<C> {
  avatar: TAvatar.Props;
}
