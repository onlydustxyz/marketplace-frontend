import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "components/atoms/avatar";
import { ButtonPort } from "components/atoms/button/button.types";
import { PaperPort } from "components/atoms/paper";
import { TagPort } from "components/atoms/tag";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardProjectPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  paperProps?: Partial<PaperPort<C>>;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatarProps: AvatarPort;
  title?: ReactNode;
  description?: ReactNode;
  topTags?: Array<TagPort<"div">>;
  bottomTags?: Array<TagPort<"div">>;
  primaryAction?: ButtonPort<"button">;
  secondaryAction?: ButtonPort<"button">;
}
