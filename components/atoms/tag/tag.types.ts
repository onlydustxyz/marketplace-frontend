import { ElementType, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { TIcon } from "components/layout/icon/icon.types";

import { TagCoreVariants } from "./tag.variants";

type Variants = VariantProps<typeof TagCoreVariants>;
type classNames = Partial<typeof TagCoreVariants["slots"]>;

export type TTagCoreProps<C extends ElementType> = AsProps<C> &
  Variants & {
    classNames?: classNames;
    as?: C;
    startContent?: ReactNode;
  };

export type TTagIconProps<C extends ElementType> = Omit<TTagCoreProps<C>, "startContent"> & {
  variant: "icon";
  icon: TIcon.Props;
};

/** TODO use new icon */
export type TTagAvatarProps<C extends ElementType> = Omit<TTagCoreProps<C>, "startContent"> & {
  variant: "avatar";
  avatar: TAvatar.Props;
};

export type TTagProps<C extends ElementType> =
  | (TTagCoreProps<C> & { variant?: "default" })
  | TTagIconProps<C>
  | TTagAvatarProps<C>;
