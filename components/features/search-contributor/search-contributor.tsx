import { Listbox, ListboxItem, ListboxSection, Spinner } from "@nextui-org/react";
import { debounce } from "lodash";
import { Key, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import UsersApi from "src/api/Users";
import { ContributorResponse } from "src/types";

import { Avatar } from "components/ds/avatar/avatar";
import { Input } from "components/ds/form/input/input";
import { SelectableItem } from "components/features/search-contributor/selectable-item/selectable-item";
import { Icon } from "components/layout/icon/icon";

import { TSearchContributor } from "./search-contributor.types";

export function SearchContributor({
  onSelectContributors,
  initialValue,
  selectionMode = "single",
  ...listboxProps
}: TSearchContributor.Props) {
  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openListbox, setOpenListbox] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [selectedContributors, setSelectedContributors] = useState<ContributorResponse[]>([]);

  const { data, isLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: debounceQuery },
  });

  const handleDebounceQuery = debounce(async (query: string) => {
    setDebounceQuery(query);
  }, 500);

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

  const selectedContributorsItems = useMemo((): TSearchContributor.ListboxItemSection[] => {
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

  const internalContributors = useMemo((): TSearchContributor.ListboxItemSection[] => {
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

  const externalContributors = useMemo((): TSearchContributor.ListboxItemSection[] => {
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

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex flex-col gap-3">
        <Input
          startContent={renderValue}
          endContent={<Icon remixName="ri-arrow-down-s-line" className="pointer-events-none" />}
          onChange={e => handleQuery(e.target.value)}
          className="relative z-30 flex w-full flex-col"
          onFocus={() => setOpenListbox(true)}
          value={searchQuery}
        />
        {openListbox ? (
          <div
            className="absolute -left-[12px] -top-[24px] z-20 flex max-h-[280px] w-[calc(100%_+_24px)] max-w-[calc(100%_+_24px)]
          translate-y-1.5 flex-col gap-4 rounded-2xl border border-default-200 border-greyscale-50/12
          bg-greyscale-800 p-4 pt-[54px] shadow-heavy  focus:outline-none dark:border-default-100"
            ref={ref}
          >
            <div
              className="overflow-y-scroll scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded
          scrollbar-w-1.5"
            >
              <Listbox
                items={[...selectedContributorsItems, ...internalContributors, ...externalContributors]}
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectElement}
                bottomContent={isLoading ? <Spinner /> : null}
                {...listboxProps}
              >
                {(item: TSearchContributor.ListboxItemSection) => (
                  <ListboxSection key={item.name} title={item.name} showDivider={item.showDivider}>
                    {item.items?.map(item => (
                      <ListboxItem
                        key={item.githubUserId}
                        startContent={<Avatar src={item.avatarUrl} alt={item.login} shape="circle" size="xs" />}
                      >
                        {item.login}
                      </ListboxItem>
                    ))}
                  </ListboxSection>
                )}
              </Listbox>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
