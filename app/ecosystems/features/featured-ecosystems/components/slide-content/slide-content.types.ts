import { PropsWithChildren } from "react";

export namespace TSlideContent {
  export interface Props extends PropsWithChildren {
    smBannerUrl: string;
    name: string;
  }
}
