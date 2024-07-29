import { ComponentPropsWithoutRef, ReactNode } from "react";

type htmlInputProps = ComponentPropsWithoutRef<"input">;

interface Variants {
  isDisabled: boolean;
  isError: boolean;
}

interface ClassNames {
  container: string;
  input: string;
  label: string;
}

export interface InputPort extends htmlInputProps, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isDisabled?: boolean;
  label?: ReactNode;
  placeholder?: string;
}
