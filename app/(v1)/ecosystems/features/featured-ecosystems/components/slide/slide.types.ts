import { EcosystemsBannerColor } from "api-client/resources/ecosystems/types";

export namespace TSlide {
  export interface Props {
    imageUrl: string;
    smImageUrl: string;
    slug: string;
    color: EcosystemsBannerColor;
    title: string;
    description: string;
  }
}
