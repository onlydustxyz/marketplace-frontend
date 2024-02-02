import { ReactElement } from "react";

export namespace THighlights {
  export interface Props {
    name: string;
    leaders: ReactElement;
    logoUrl: string;
    isPrivate: boolean;
  }
}
