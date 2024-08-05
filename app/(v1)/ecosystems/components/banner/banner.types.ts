import { EcosystemsBannerColor } from "api-client/resources/ecosystems/types";
import { PropsWithChildren } from "react";

export namespace TBanner {
  export interface Props {
    imageUrl: string;
    smImageUrl: string;
    color: EcosystemsBannerColor;
    title: string;
    description: string;
  }
  export interface PropsContent extends PropsWithChildren {
    smBannerUrl: string;
    name: string;
  }
}
