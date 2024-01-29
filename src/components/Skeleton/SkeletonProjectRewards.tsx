import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import ProjectRewardsDesktopPlaceholder from "./Placeholders/ProjectRewardsDesktopPlaceholder";
import ProjectRewardsMobilePlaceholder from "./Placeholders/ProjectRewardsMobilePlaceholder";
import ProjectRewardsTabletPlaceholder from "./Placeholders/ProjectRewardsTabletPlaceHolder";

export default function SkeletonSort() {
  const isDesktop = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const isTablet = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const isMobile = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);

  const Skelleton = useMemo(() => {
    if (isDesktop) return <ProjectRewardsDesktopPlaceholder />;
    if (isTablet) return <ProjectRewardsTabletPlaceholder />;
    if (isMobile) return <ProjectRewardsMobilePlaceholder />;

    return <></>;
  }, [isDesktop, isTablet, isMobile]);

  return <div className="relative w-full">{Skelleton}</div>;
}
