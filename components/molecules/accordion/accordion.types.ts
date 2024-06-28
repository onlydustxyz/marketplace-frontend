import { ReactNode } from "react";

import { BadgePort } from "components/atoms/badge";
import { TypoPort } from "components/atoms/typo/typo.types";

type ClassNames = Partial<{
  base: string;
  heading: string;
  trigger: string;
  content: string;
}>;

export interface AccordionItemProps {
  id: string;
  titleProps: Partial<TypoPort<"span">>;
  content: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface AccordionItemWithBadgeProps extends Omit<AccordionItemProps, "endContent"> {
  badgeProps?: BadgePort<"div">;
}

export interface AccordionPort {
  classNames?: ClassNames;
  items: AccordionItemProps[];
  multiple?: boolean;
  defaultSelected?: string[];
}

export interface AccordionWithBadgePort extends Omit<AccordionPort, "items"> {
  items: AccordionItemWithBadgeProps[];
}
