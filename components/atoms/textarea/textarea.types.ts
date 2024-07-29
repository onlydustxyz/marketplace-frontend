import { ComponentPropsWithoutRef, ReactNode } from "react";

// Should use the `textarea` HTML element, but we're using `input` to please NextUI for now
type htmlTextareaProps = ComponentPropsWithoutRef<"input">;

interface Variants {
  isDisabled: boolean;
  isError: boolean;
}

interface ClassNames {
  base: string;
  mainWrapper: string;
  inputWrapper: string;
  innerWrapper: string;
  input: string;
  errorMessage: string;
  label: string;
  helperWrapper: string;
  description: string;
}

export interface TextareaPort extends htmlTextareaProps, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  isDisabled?: boolean;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
}
