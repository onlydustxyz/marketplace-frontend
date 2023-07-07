import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useLocalStorage } from "react-use";

export enum Ownership {
  All = "All",
  Mine = "Mine",
}

export interface ProjectFilter {
  ownership: Ownership;
  technologies: string[];
  sponsors: string[];
  search: string;
}

enum ActionType {
  Clear = "clear",
  SetOwnership = "ownership",
  SetTechnologies = "technologies",
  SetSponsors = "sponsors",
  SetSearch = "search",
}

type Action =
  | {
      type: ActionType.Clear;
    }
  | {
      type: ActionType.SetTechnologies | ActionType.SetSponsors;
      values: string[];
    }
  | {
      type: ActionType.SetOwnership;
      ownership: Ownership;
    }
  | {
      type: ActionType.SetSearch;
      searchQuery: string;
    };

const PROJECT_FILTER_KEY = "project_filter";

const DEFAULT_FILTER: ProjectFilter = {
  ownership: Ownership.All,
  technologies: [],
  sponsors: [],
  search: "",
};

const reduce = (filter: ProjectFilter, action: Action): ProjectFilter => {
  switch (action.type) {
    case ActionType.Clear:
      return DEFAULT_FILTER;
    case ActionType.SetOwnership:
      return { ...filter, ownership: action.ownership };
    case ActionType.SetTechnologies:
      return { ...filter, technologies: action.values };
    case ActionType.SetSponsors:
      return { ...filter, sponsors: action.values };
    case ActionType.SetSearch:
      return { ...filter, search: action.searchQuery };
  }
};

type Context = {
  projectFilter: ProjectFilter;
  isCleared: boolean;
  clear: () => void;
  setOwnership: (ownership: Ownership) => void;
  setTechnologies: (technologies: string[]) => void;
  setSponsors: (sponsors: string[]) => void;
  setSearch: (searchQuery: string) => void;
};

export const ProjectFilterContext = createContext<Context | null>(null);

export function ProjectFilterProvider({ children }: PropsWithChildren) {
  const [storage, setStorage] = useLocalStorage(PROJECT_FILTER_KEY, DEFAULT_FILTER);
  const [projectFilter, dispatch] = useReducer(reduce, { ...DEFAULT_FILTER, ...storage });

  useEffect(() => setStorage(projectFilter), [setStorage, projectFilter]);

  const isCleared = useMemo(() => JSON.stringify(projectFilter) == JSON.stringify(DEFAULT_FILTER), [projectFilter]);
  const clear = useCallback(() => dispatch({ type: ActionType.Clear }), []);
  const setOwnership = useCallback(
    (ownership: Ownership) => dispatch({ type: ActionType.SetOwnership, ownership }),
    []
  );
  const setTechnologies = useCallback(
    (technologies: string[]) => dispatch({ type: ActionType.SetTechnologies, values: technologies }),
    []
  );
  const setSponsors = useCallback(
    (sponsors: string[]) => dispatch({ type: ActionType.SetSponsors, values: sponsors }),
    []
  );
  const setSearch = useCallback((searchQuery: string) => dispatch({ type: ActionType.SetSearch, searchQuery }), []);

  return (
    <ProjectFilterContext.Provider
      value={{
        projectFilter,
        isCleared,
        clear,
        setOwnership,
        setTechnologies,
        setSponsors,
        setSearch,
      }}
    >
      {children}
    </ProjectFilterContext.Provider>
  );
}

export function MockedProjectFilterProvider({
  projectFilter,
  isCleared,
  children,
}: { projectFilter?: ProjectFilter; isCleared?: boolean } & PropsWithChildren) {
  return (
    <ProjectFilterContext.Provider
      value={{
        projectFilter: projectFilter ?? DEFAULT_FILTER,
        isCleared: isCleared ?? true,
        clear: Function.prototype(),
        setOwnership: Function.prototype(),
        setTechnologies: Function.prototype(),
        setSponsors: Function.prototype(),
        setSearch: Function.prototype(),
      }}
    >
      {children}
    </ProjectFilterContext.Provider>
  );
}

export const useProjectFilter = () => {
  const context = useContext(ProjectFilterContext);
  if (!context) {
    throw new Error("useProjectFilter must be used within an ProjectFilterProvider");
  }
  return context;
};
