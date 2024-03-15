import { Dispatch, SetStateAction } from "react";

import { components } from "src/__generated/api";
import { ContributorResponse } from "src/types";

export namespace TUseSearchContributors {
  export interface Return {
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    openListbox: boolean;
    setOpenListbox: Dispatch<SetStateAction<boolean>>;
    selectedContributors: ContributorResponse[];
    handleQueryChange: (query: string) => void;
    handleClickOutside: () => void;
    onSelectElement: (selectedGithubUserId: "all" | Set<string>) => void;
    data: components["schemas"]["ContributorSearchResponse"] | undefined;
    isLoading: boolean;
  }
}
