import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "components/atoms/avatar";
import { ButtonPort } from "components/atoms/button/button.types";
import { PaperPort } from "components/atoms/paper";
import { TagPort } from "components/atoms/tag";

interface ClassNames {
  base: string;
}

export interface CardProjectPort<C extends ElementType> {
  as?: C;
  paperProps?: Partial<PaperPort<C>>;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  avatarProps: AvatarPort;
  title: ReactNode;
  description?: ReactNode;
  topTags?: Array<TagPort<"div">>;
  bottomTags?: Array<TagPort<"div">>;
  primaryActionProps?: ButtonPort<"button">;
  secondaryActionProps?: ButtonPort<"button">;
}
