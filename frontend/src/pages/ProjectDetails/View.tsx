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
    <div className="flex flex-row flex-1 w-full h-0 pb-6">
      <ProjectsSidebar projectId={projectId} />
      <Background roundedBorders={BackgroundRoundedBorders.Right} withSidebar={true}>
        <div className="h-full px-8 py-6 flex flex-col flex-1 gap-6">
          <Suspense fallback={<Loader />}>
            <Outlet context={outletContext} />
          </Suspense>
        </div>
      </Background>
    </div>
  );
}
