import { PropsWithChildren } from "react";

export type MultiStepsFormProps = {
  title: string;
  description?: string;
  step: number;
  stepCount: number;
  private?: boolean;
  prev?: string;
  next?: string;
  submit?: boolean;
} & PropsWithChildren;
