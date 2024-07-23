import { ComponentPropsWithoutRef, ElementType } from "react";

import { AvatarPort } from "components/atoms/avatar";

interface Variants extends Pick<AvatarPort, "size" | "shape" | "container"> {}

interface ClassNames {
  base: string;
}

interface AvatarItem extends Pick<AvatarPort, "src" | "name"> {}

export interface AvatarGroupPort<C extends ElementType> extends Partial<Variants>, Pick<AvatarPort, "showFallback"> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatars: AvatarItem[];
  maxAvatars?: number;
  disableAnimation?: boolean;
}
