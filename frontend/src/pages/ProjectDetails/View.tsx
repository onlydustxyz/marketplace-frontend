import ProjectsSidebar from "./Sidebar";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "src/components/Loader";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  projectId: string;
  projectKey: string;
}

export default function View({ projectId, projectKey }: Props) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const outletContext = {
    projectId,
    projectKey,
  };
  return (
    <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-0 xl:pt-0">
      <ProjectsSidebar projectId={projectId} />
      <Background roundedBorders={isXl ? BackgroundRoundedBorders.Right : BackgroundRoundedBorders.Full}>
        <div className="flex h-full flex-1 flex-col gap-6 px-4 py-6 xl:px-8">
          <Suspense fallback={<Loader />}>
            <Outlet context={outletContext} />
          </Suspense>
        </div>
      </Background>
    </div>
  );
}
