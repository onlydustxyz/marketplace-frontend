import { PropsWithChildren } from "react";

export type MultiStepsFormProps = PropsWithChildren<{
  title: string;
  description?: string;
  step: number;
  stepCount: number;
  private?: boolean;
  prev?: () => void;
  next?: () => void;
  nextDisabled?: boolean;
  submitButton?: React.ReactNode;
  footerRightElement?: React.ReactNode;
  stickyChildren?: React.ReactNode;
}>;
