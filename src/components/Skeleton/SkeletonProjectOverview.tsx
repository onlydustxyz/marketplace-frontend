import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import ProjectOverviewDesktopPlaceholder from "./Placeholders/ProjectOverviewDesktopPlaceholder";
import ProjectOverviewMobilePlaceholder from "./Placeholders/ProjectOverviewMobilePlaceholder";

export default function SkeletonProjectOverview() {
  const isDesktop = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const isMobile = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);
  return (
    <div className="relative w-full">
      {isDesktop ? <ProjectOverviewDesktopPlaceholder /> : null}
      {isMobile ? <ProjectOverviewMobilePlaceholder /> : null}
    </div>
  );
}
