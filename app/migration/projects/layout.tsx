import { PropsWithChildren } from "react";

import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { SpaceBackground } from "components/layout/pages/space-background/space-background";

import { ProjectsContextProvider } from "./context/project.context";

export default function ProjectsLayout({ children }: PropsWithChildren) {
  return (
    <ProjectsContextProvider>
      <ScrollView>
        <SpaceBackground />
        <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">{children}</div>
      </ScrollView>
    </ProjectsContextProvider>
  );
}
