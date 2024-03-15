import { debounce } from "lodash";
import { Key, useMemo, useState } from "react";

import UsersApi from "src/api/Users";
import { ContributorResponse } from "src/types";

import { TUseSearchContributors } from "components/features/search-contributor/hooks/use-search-contributors.types";
import { SelectableItem } from "components/features/search-contributor/selectable-item/selectable-item";
import { Icon } from "components/layout/icon/icon";

export function useSearchContributors({
  onSelectContributors,
  initialValue,
}: TUseSearchContributors.Props): TUseSearchContributors.Return {
  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openListbox, setOpenListbox] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [selectedContributors, setSelectedContributors] = useState<ContributorResponse[]>(
    initialValue ? [initialValue] : []
  );

  const { data, isLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: debounceQuery },
  });

  const handleDebounceQuery = debounce(async (query: string) => {
    setDebounceQuery(query);
  }, 300);

  function handleQuery(query: string) {
    handleDebounceQuery(query);
    setSearchQuery(query);
  }

  function handleClickOutside() {
    setOpenListbox(false);
    setDebounceQuery("");
    setSearchQuery("");
  }

  function onSelectElement(selectedGithubUserId: "all" | Set<Key>) {
    if (selectedGithubUserId === "all") {
      return;
    }
    const selectedContributor = Array.from(selectedGithubUserId)
      .map(
        singleSelectedGithubUserId =>
          data?.internalContributors?.find(({ githubUserId }) => `${githubUserId}` === singleSelectedGithubUserId) ||
          data?.externalContributors?.find(({ githubUserId }) => `${githubUserId}` === singleSelectedGithubUserId)
      )
      .filter(Boolean) as ContributorResponse[];
    if (selectedContributor) {
      setSelectedContributors(selectedContributor);
      setSelectedKeys(selectedGithubUserId);
      setDebounceQuery("");
      setSearchQuery("");
      onSelectContributors(selectedContributor);
    }
  }

  const selectedContributorsItems = useMemo(() => {
    if (selectedContributors.length) {
      return [
        {
          name: "Selected",
          items: selectedContributors,
          showDivider: true,
        },
      ];
    }
    return [];
  }, [selectedContributors]);

  const internalContributors = useMemo(() => {
    if (data?.internalContributors?.length) {
      return [
        {
          name: "Internal",
          items:
            data?.internalContributors.filter(
              c => !selectedContributors.find(s => s.githubUserId === c.githubUserId)
            ) || [],
          showDivider: !!data?.externalContributors?.length,
        },
      ];
    }
    return [];
  }, [data, selectedContributors]);

  const externalContributors = useMemo(() => {
    if (data?.externalContributors?.length) {
      return [
        {
          name: "External",
          items:
            data?.externalContributors.filter(
              c => !selectedContributors.find(s => s.githubUserId === c.githubUserId)
            ) || [],
          showDivider: false,
        },
      ];
    }
    return [];
  }, [data, selectedContributors]);

  const contributors = useMemo(() => {
    return [...selectedContributorsItems, ...internalContributors, ...externalContributors];
  }, [selectedContributorsItems, internalContributors, externalContributors]);

  const renderValue = useMemo(() => {
    if (selectedContributors.length && !openListbox) {
      return selectedContributors.map(contributor => (
        <SelectableItem
          key={contributor.githubUserId}
          avatarUrl={contributor.avatarUrl}
          login={contributor.login}
          isRegistered={contributor.isRegistered}
        />
      ));
    }
    return <Icon remixName="ri-user-line" className="pointer-events-none" />;
  }, [selectedContributors, openListbox]);

  return {
    searchQuery,
    isLoading,
    openListbox,
    selectedKeys,
    contributors,
    renderValue,
    handleQuery,
    handleClickOutside,
    onSelectElement,
    setOpenListbox,
  };
}
