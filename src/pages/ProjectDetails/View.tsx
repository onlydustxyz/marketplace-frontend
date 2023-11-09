import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { components } from "src/__generated/api";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Loader from "src/components/Loader";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ProjectsSidebar from "./Sidebar";
import { cn } from "src/utils/cn";

export type OutletContext = {
  project: components["schemas"]["ProjectResponse"];
};

interface Props {
  project: OutletContext;
  padded?: boolean;
  loading: boolean | undefined;
  error: null | unknown;
}

export default function View({ project, padded = true }: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const outletContext = {
    project,
  };

  const { id } = project;
  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
      <ProjectsSidebar projectId={id} />
      <Background roundedBorders={isXl ? BackgroundRoundedBorders.Right : BackgroundRoundedBorders.Full}>
        <div
          className={cn("mx-auto flex h-full flex-1 flex-col gap-6", {
            "max-w-7xl gap-6 px-4 py-6 xl:px-8": padded,
          })}
        >
          <Suspense fallback={<Loader />}>
            <Outlet context={outletContext} />
          </Suspense>
        </div>
      </Background>
    </div>
  );
}
