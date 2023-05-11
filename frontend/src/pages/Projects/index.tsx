import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilterProvider } from "./useProjectFilter";
import useScrollRestoration from "./AllProjects/useScrollRestoration";
import { Suspense } from "react";
import Loader from "src/components/Loader";

export default function Projects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();

  const [ref] = useScrollRestoration();

  return (
    <ProjectFilterProvider>
      <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="md:container md:mx-auto pt-8 xl:pt-16 pb-8 px-4 md:px-12">
          <div className="hidden xl:block text-5xl font-belwe">{T("navbar.projects")}</div>
          <div className="flex xl:mt-8 gap-6 h-full">
            <div className="hidden xl:block basis-80 shrink-0 sticky top-0">
              <FilterPanel isProjectLeader={!!ledProjectIds.length} />
            </div>
            <div className="grow min-w-0">
              <Suspense fallback={<Loader />}>
                <AllProjects />
              </Suspense>
            </div>
          </div>
        </div>
      </Background>
    </ProjectFilterProvider>
  );
}
