import { PropsWithChildren } from "react";

export namespace TRenderByPath {
  export interface Props extends PropsWithChildren {
    path: string;
    exact?: boolean;
    matches?: boolean;
  }
}
