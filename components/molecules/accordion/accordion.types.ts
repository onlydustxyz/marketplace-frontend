import { ComponentProps, ReactNode } from "react";

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
  content: ReactNode[];
}

type SelectionMode = "single" | "multiple";

export interface AccordionPort {
  classNames?: classNames;
  items: AccordionItemProps[];
  selectionMode?: SelectionMode;
  defaultSelected?: string[];
  startContent?: ReactNode;
  showBadge?: boolean;
}
