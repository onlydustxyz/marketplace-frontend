import { PropsWithChildren } from "react";
import { SpaceBackground } from "@/components/layout/pages/space-background";
import { ScrollView } from "@/components/layout/pages/scroll-view";

function ProjectsLayout({ children }: PropsWithChildren) {
  return (
    <ScrollView>
      <SpaceBackground />
      <div className="flex max-w-7xl flex-col gap-6 px-4 py-4 md:mx-auto md:px-12 xl:pb-8 xl:pt-12">{children}</div>
    </ScrollView>
  );
}

export default ProjectsLayout;
