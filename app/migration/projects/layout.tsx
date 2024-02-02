import { PropsWithChildren } from "react";

import { NavigationNextEvents } from "components/features/navigation/navigation-next";

import { ProjectsContextProvider } from "./context/project.context";

export default function ProjectsLayout({ children }: PropsWithChildren) {
  return (
    <ProjectsContextProvider>
      <div className="scrollbar-sm relative z-[1] h-[calc(100dvh)]">
        <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">{children}</div>
      </div>
      <NavigationNextEvents />
    </ProjectsContextProvider>
  );
}
