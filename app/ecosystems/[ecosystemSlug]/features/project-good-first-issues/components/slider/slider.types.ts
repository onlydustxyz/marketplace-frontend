import { ReactNode } from "react";

export namespace TSlider {
  export interface Props {
    ecosystemSlug: string;
    children: ReactNode[];
    hasMore: boolean;
  }
}
