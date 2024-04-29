import { ReactNode } from "react";

export namespace TItem {
  export interface Props {
    label: ReactNode;
    labelIcon?: ReactNode;
    value: ReactNode;
    isEditMode?: boolean;
    field?: {
      name: string;
      value: string | undefined;
      onChange: (value: string) => void;
    };
  }
}
