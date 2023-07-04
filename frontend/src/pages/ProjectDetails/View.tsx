import ProjectsSidebar from "./Sidebar";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "src/components/Loader";

interface Props {
  projectId: string;
}

export default function View({ projectId }: Props) {
  const outletContext = {
    projectId,
  };
  return (
    <div className="flex h-0 w-full flex-1 flex-col gap-4 pb-6 pt-4 xl:flex-row xl:gap-0 xl:pt-0">
      <ProjectsSidebar projectId={projectId} />
      <Background roundedBorders={BackgroundRoundedBorders.Right} withSidebar={true}>
        <div className="flex h-full flex-1 flex-col gap-6 px-4 py-6 xl:px-8">
          <Suspense fallback={<Loader />}>
            <Outlet context={outletContext} />
          </Suspense>
        </div>
      </Background>
    </div>
  );
}
