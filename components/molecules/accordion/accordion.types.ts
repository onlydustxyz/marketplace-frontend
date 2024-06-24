import { ComponentProps, ReactNode } from "react";

import { Badge } from "components/atoms/badge";
import { Typo } from "components/atoms/typo/variants/typo-default";

type classNames = Partial<{
  base: string;
  heading: string;
  trigger: string;
  content: string;
}>;

export interface AccordionItemProps {
  id: string;
  titleProps: Partial<ComponentProps<typeof Typo>>;
  content: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface AccordionItemWithBadgeProps extends Omit<AccordionItemProps, "endContent"> {
  badgeProps?: ComponentProps<typeof Badge>;
}

type SelectionMode = "single" | "multiple";

export interface AccordionPort {
  classNames?: classNames;
  items: AccordionItemProps[];
  selectionMode?: SelectionMode;
  defaultSelected?: string[];
}

export interface AccordionWithBadgePort extends Omit<AccordionPort, "items"> {
  items: AccordionItemWithBadgeProps[];
}
