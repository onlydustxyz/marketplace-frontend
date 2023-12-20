import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ProjectRewardsMobilePlaceholder from "./Placeholders/ProjectRewardsMobilePlaceholder";
import ProjectRewardsDesktopPlaceholder from "./Placeholders/ProjectRewardsDesktopPlaceholder";
import ProjectRewardsTabletPlaceholder from "./Placeholders/ProjectRewardsTabletPlaceHolder";

export default function SkeletonSort() {
  const isDesktop = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const isTablet = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const isMobile = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);
  return (
    <div className="relative w-full">
      {isDesktop ? <ProjectRewardsDesktopPlaceholder /> : null}
      {isTablet ? <ProjectRewardsTabletPlaceholder /> : null}
      {isMobile ? <ProjectRewardsMobilePlaceholder /> : null}
    </div>
  );
}
