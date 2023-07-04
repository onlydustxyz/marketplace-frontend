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
    <div className="flex h-0 w-full flex-1 flex-row pb-6">
      <ProjectsSidebar projectId={projectId} />
      <Background roundedBorders={BackgroundRoundedBorders.Right} withSidebar={true}>
        <div className="flex h-full flex-1 flex-col gap-6 px-8 py-6">
          <Suspense fallback={<Loader />}>
            <Outlet context={outletContext} />
          </Suspense>
        </div>
      </Background>
    </div>
  );
}
