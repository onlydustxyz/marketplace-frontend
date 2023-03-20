import { useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import { useT } from "talkr";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";
import { ProjectFilter, ProjectFilterAction, ProjectFilterActionType, ProjectOwnershipType } from "./types";

const PROJECT_FILTER_KEY = "project_filter";

const DEFAULT_FILTER: ProjectFilter = {
  ownershipType: ProjectOwnershipType.All,
  technologies: [],
};

const reduceFilters = (filter: ProjectFilter, action: ProjectFilterAction): ProjectFilter => {
  switch (action.type) {
    case ProjectFilterActionType.Clear:
      return DEFAULT_FILTER;
    case ProjectFilterActionType.SelectOwnership:
      return { ...filter, ownershipType: action.ownership };
    case ProjectFilterActionType.SelectTechnologies:
      return { ...filter, technologies: action.values };
  }
};

export default function Projects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();

  const [projectFilterStorage, setProjectFilterStorage] = useLocalStorage(PROJECT_FILTER_KEY, DEFAULT_FILTER);
  const [projectFilter, dispatchProjectFilter] = useReducer(reduceFilters, projectFilterStorage ?? DEFAULT_FILTER);

  useEffect(() => setProjectFilterStorage(projectFilter), [projectFilter]);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="md:container md:mx-auto pt-8 xl:pt-16 pb-8 px-4 md:px-12 h-full">
        <div className="hidden xl:block text-5xl font-belwe">{T("navbar.projects")}</div>
        <div className="flex xl:mt-8 gap-6 h-full">
          <div className="hidden xl:block basis-80 shrink-0">
            {projectFilter && (
              <FilterPanel
                projectFilter={projectFilter}
                dispatchProjectFilter={dispatchProjectFilter}
                isProjectFilterCleared={() => JSON.stringify(projectFilter) == JSON.stringify(DEFAULT_FILTER)}
                isProjectLeader={!!ledProjectIds.length}
              />
            )}
          </div>
          {projectFilter && projectFilter.technologies && projectFilter.ownershipType && (
            <AllProjects
              technologies={projectFilter.technologies}
              projectOwnershipType={projectFilter.ownershipType}
              clearFilters={() => dispatchProjectFilter({ type: ProjectFilterActionType.Clear })}
            />
          )}
        </div>
      </div>
    </Background>
  );
}
