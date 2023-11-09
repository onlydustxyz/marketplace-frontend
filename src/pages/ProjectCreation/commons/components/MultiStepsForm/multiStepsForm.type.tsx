import { PropsWithChildren } from "react";

export type MultiStepsFormProps = PropsWithChildren<{
  title: string;
  description?: string;
  step: number;
  stepCount: number;
  private?: boolean;
  prev?: string;
  next?: string;
  nextDisabled?: boolean;
  submitButton?: React.ReactNode;
  footerRightElement?: React.ReactNode;
  stickyChildren?: React.ReactNode;
}>;
