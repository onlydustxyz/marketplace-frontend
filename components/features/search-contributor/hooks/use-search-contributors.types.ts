import { Dispatch, Key, ReactElement, SetStateAction } from "react";

import { ContributorResponse } from "src/types";

import { TSearchContributor } from "components/features/search-contributor/search-contributor.types";

export namespace TUseSearchContributors {
  export interface Props {
    onSelectContributors: (contributor: ContributorResponse[]) => void;
  }
  export interface Return {
    searchQuery: string;
    isLoading: boolean;
    openListbox: boolean;
    selectedKeys: Set<Key>;
    contributors: TSearchContributor.ListboxItemSection[];
    renderValue: ReactElement | ReactElement[];
    handleQuery: (query: string) => void;
    handleClickOutside: () => void;
    onSelectElement: (selectedGithubUserId: "all" | Set<Key>) => void;
    setOpenListbox: Dispatch<SetStateAction<boolean>>;
  }
}
