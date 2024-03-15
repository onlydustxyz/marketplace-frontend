import { debounce } from "lodash";
import { useCallback, useState } from "react";

import UsersApi from "src/api/Users";
import { ContributorResponse } from "src/types";

import { TUseSearchContributors } from "components/features/search-contributor/hooks/use-search-contributors.types";

export function useSearchContributors(): TUseSearchContributors.Return {
  const [searchQuery, setSearchQuery] = useState("");
  const [openListbox, setOpenListbox] = useState(false);
  const [selectedContributors, setSelectedContributors] = useState<ContributorResponse[]>([]);

  const { data, isLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: searchQuery },
  });

  const handleQueryChange = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  const handleClickOutside = () => {
    setOpenListbox(false);
    setSearchQuery("");
  };

  const onSelectElement = (selectedGithubUserId: "all" | Set<string>) => {
    if (selectedGithubUserId === "all") {
      return;
    }

    const selected = Array.from(selectedGithubUserId).flatMap(id =>
      [...(data?.internalContributors ?? []), ...(data?.externalContributors ?? [])].filter(
        contributor => `${contributor.githubUserId}` === id
      )
    );

    setSelectedContributors(selected);
    setSearchQuery("");
    setOpenListbox(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    openListbox,
    setOpenListbox,
    selectedContributors,
    handleQueryChange,
    handleClickOutside,
    onSelectElement,
    data,
    isLoading,
  };
}
