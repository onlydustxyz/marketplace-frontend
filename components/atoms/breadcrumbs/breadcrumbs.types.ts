import { ReactNode } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

interface ItemBase {
  id: string;
  label: ReactNode;
  className?: string;
}

interface ItemLink extends ItemBase {
  href?: string;
  onClick?: never;
}

interface ItemButton extends ItemBase {
  href?: never;
  onClick?: () => void;
}

export type Item = ItemLink | ItemButton;

export interface BreadcrumbsPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  items: Item[];
}
