import { ReactNode } from "react";

export namespace TError {
  export interface Props {
    title: string;
    message?: ReactNode;
    onBack?: () => void;
    onRefresh?: () => void;
  }
}
