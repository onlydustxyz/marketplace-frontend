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

export enum Sorting {
  Trending = "trending",
  ProjectName = "projectName",
  ReposCount = "reposCount",
  ContributorsCount = "contributorsCount",
  MoneyGranted = "moneyGranted",
  LeftToSpend = "leftToSpend",
  TotalBudget = "totalBudget",
}

export const PROJECT_SORTINGS = [
  Sorting.Trending,
  Sorting.ProjectName,
  Sorting.ReposCount,
  Sorting.ContributorsCount,
  Sorting.MoneyGranted,
  Sorting.LeftToSpend,
  Sorting.TotalBudget,
];

const DEFAULT_SORTING = Sorting.Trending;

export default function Projects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();

  const [projectSorting, setProjectSorting] = useLocalStorage("PROJECT_SORTING_2", DEFAULT_SORTING);
  const [ref] = useScrollRestoration();

  return (
    <ProjectFilterProvider>
      <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="px-4 pb-8 pt-8 md:container md:mx-auto md:px-12 xl:pt-16">
          <div className="relative hidden items-end justify-between font-belwe text-5xl xl:flex">
            {T("navbar.projects")}
            <div className="absolute right-0 top-0 z-10">
              <SortingDropdown
                all={PROJECT_SORTINGS}
                current={projectSorting || DEFAULT_SORTING}
                onChange={setProjectSorting}
              />
            </div>
          </div>
          <div className="flex h-full gap-6 xl:mt-8">
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
