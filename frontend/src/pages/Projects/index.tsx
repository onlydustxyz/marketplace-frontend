import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilterProvider } from "./useProjectFilter";

export default function Projects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();

  return (
    <ProjectFilterProvider>
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="md:container md:mx-auto pt-8 xl:pt-16 pb-8 px-4 md:px-12 h-full">
          <div className="hidden xl:block text-5xl font-belwe">{T("navbar.projects")}</div>
          <div className="flex xl:mt-8 gap-6 h-full">
            <div className="hidden xl:block basis-80 shrink-0">
              <FilterPanel isProjectLeader={!!ledProjectIds.length} />
            </div>
            <AllProjects />
          </div>
        </div>
      </Background>
    </ProjectFilterProvider>
  );
}
