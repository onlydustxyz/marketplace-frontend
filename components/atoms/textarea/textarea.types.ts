import { ReactNode } from "react";

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

export interface TextareaPort extends Partial<Variants> {
  id?: string;
  name: string;
  classNames?: Partial<ClassNames>;
  isDisabled?: boolean;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
