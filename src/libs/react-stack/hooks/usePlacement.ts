import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

export const usePlacement = (): { placement: "right" | "bottom"; isMobile: boolean } => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  return { placement: isXl ? "right" : "bottom", isMobile: !isXl };
};
