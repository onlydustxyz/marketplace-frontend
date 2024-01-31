import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

/**
 * Custom hook that determines the placement and mobile status based on the viewport size.
 * @returns An object containing the placement ("right" or "bottom") and a boolean indicating if the device is mobile.
 */
export const usePlacement = (): { placement: "right" | "bottom"; isMobile: boolean } => {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  return { placement: isMd ? "right" : "bottom", isMobile: !isMd };
};
