import { EcosystemsBannerColor } from "api-client/resources/ecosystems/types";

export function getBannerColor({ color }: { color: EcosystemsBannerColor }) {
  if (color === "LIGHT") {
    return "text-greyscale-50";
  }

  return "text-spaceBlue-900";
}
