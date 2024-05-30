import { EcosystemsBannerColor } from "api-client/resources/ecosystems/types";

export function GetBannerColor({ color }: { color: EcosystemsBannerColor }) {
  if (color === "LIGHT") {
    return "text-greyscale-50";
  }

  return "text-spaceBlue-900";
}
