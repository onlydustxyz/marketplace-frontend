import { Dispatch, ReactNode, SetStateAction } from "react";

export interface PopoverContextPort {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PopoverPort {
  children: ReactNode[];
  defaultOpen?: boolean;
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "right-start"
    | "right"
    | "right-end"
    | "left-start"
    | "left"
    | "left-end";
}

export interface PopoverTriggerPort {
  children(args: PopoverContextPort): ReactNode;
}

export interface PopoverContentPort {
  children(args: PopoverContextPort): ReactNode;
  className?: string;
}
