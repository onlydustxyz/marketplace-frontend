import { Dispatch, Key, ReactElement, SetStateAction } from "react";

import ProjectApi from "src/api/Project";
import { ProjectPageItemResponse } from "src/types";

import { TSearchProjects } from "components/features/search-projects/search-projects.types";

export namespace TUseSearchProjects {
  export interface Props {
    onSelectProjects: (projects: ProjectPageItemResponse[]) => void;
    initialValue?: ProjectPageItemResponse;
    isMultiple?: boolean;
  }
  export interface Return {
    searchQuery: string;
    query: Omit<ReturnType<typeof ProjectApi.queries.useInfiniteList>, "data">;
    openListbox: boolean;
    selectedKeys: Set<Key>;
    projects: TSearchProjects.ListboxItemSection[];
    renderValue: ReactElement | ReactElement[];
    handleQuery: (query: string) => void;
    handleClickOutside: () => void;
    onSelectElement: (selectedId: "all" | Set<Key>) => void;
    setOpenListbox: Dispatch<SetStateAction<boolean>>;
  }
}
