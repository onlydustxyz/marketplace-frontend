import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { useMemo } from "react";
import ProjectRewardsTableDesktopPlaceholder from "./Placeholders/ProjectRewardsTableDesktopPlaceholder";
import ProjectRewardsTableTabletPlaceholder from "./Placeholders/ProjectRewardsTableTabletPlaceHolder";
import ProjectRewardsTableMobilePlaceholder from "./Placeholders/ProjectRewardsTableMobilePlaceholder";

export default function SkeletonSort() {
  const isDesktop = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const isTablet = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const isMobile = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);

  const Skelleton = useMemo(() => {
    if (isDesktop) return <ProjectRewardsTableDesktopPlaceholder />;
    if (isTablet) return <ProjectRewardsTableTabletPlaceholder />;
    if (isMobile) return <ProjectRewardsTableMobilePlaceholder />;

    return <></>;
  }, [isDesktop, isTablet, isMobile]);

  return <div className="relative w-full">{Skelleton}</div>;
}
