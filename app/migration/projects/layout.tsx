import Background, { BackgroundRoundedBorders } from "../../../src/components/Background";
import { PropsWithChildren } from "react";

function ProjectsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">
          <div className="flex h-full gap-6">{children}</div>
        </div>
      </Background>
    </div>
  );
}

export default ProjectsLayout;
