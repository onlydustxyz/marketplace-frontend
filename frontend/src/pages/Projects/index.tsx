import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilterProvider } from "./useProjectFilter";
import useScrollRestoration from "./AllProjects/useScrollRestoration";
import { Suspense } from "react";
import Loader from "src/components/Loader";
import SortingDropdown from "./SortingDropdown";
import { useLocalStorage } from "react-use";
import { PROJECT_SORTINGS, Sorting } from "./sorting";
import { FilterButton } from "./FilterPanel/FilterButton";
import { SortButton } from "./SortingDropdown/SortButton";

const DEFAULT_SORTING = Sorting.Trending;

export default function Projects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();

  const [projectSorting, setProjectSorting] = useLocalStorage("PROJECT_SORTING_2", DEFAULT_SORTING);
  const [ref] = useScrollRestoration();

  return (
    <ProjectFilterProvider>
      <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="flex flex-col gap-6 px-4 pb-8 pt-8 md:container md:mx-auto md:px-12 xl:gap-8 xl:pt-16">
          <div className="relative flex items-center justify-between">
            <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.projects")}</div>
            <div className="z-10 hidden text-red-50 xl:block">
              <SortingDropdown
                all={PROJECT_SORTINGS}
                current={projectSorting || DEFAULT_SORTING}
                onChange={setProjectSorting}
              />
            </div>
            <div className="flex items-center gap-2 xl:hidden">
              <SortButton
                all={PROJECT_SORTINGS}
                current={projectSorting || DEFAULT_SORTING}
                onChange={setProjectSorting}
              />
              <FilterButton isProjectLeader={!!ledProjectIds.length} />
            </div>
          </div>
          <div className="flex h-full gap-6">
            <div className="sticky top-0 hidden shrink-0 basis-80 xl:block">
              <FilterPanel isProjectLeader={!!ledProjectIds.length} />
            </div>
            <div className="min-w-0 grow">
              <Suspense fallback={<Loader />}>
                <AllProjects sorting={projectSorting || DEFAULT_SORTING} />
              </Suspense>
            </div>
          </div>
        </div>
      </Background>
    </ProjectFilterProvider>
  );
}
