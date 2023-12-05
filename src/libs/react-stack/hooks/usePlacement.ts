import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

/**
 * Custom hook that determines the placement and mobile status based on the viewport size.
 * @returns An object containing the placement ("right" or "bottom") and a boolean indicating if the device is mobile.
 */
export const usePlacement = (): { placement: "right" | "bottom"; isMobile: boolean } => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  return { placement: isXl ? "right" : "bottom", isMobile: !isXl };
};
