import { debounce } from "lodash";
import { useState } from "react";

import UsersApi from "src/api/Users";
import { ItemType } from "src/components/New/Field/Combobox/MultiList";
import { useIntl } from "src/hooks/useIntl";

import { TSearchContributor } from "./search-contributor.types";

export function SearchContributor({ onChange, value }: TSearchContributor.Props) {
  const [query, setQuery] = useState("");
  const { T } = useIntl();

  const { data, isLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: query },
  });

  const handleQueryChange = debounce(async (query: string) => {
    setQuery(query);
  }, 500);

  function handleChange(contributor: TSearchContributor.Contributor) {
    console.log("change", contributor);
    onChange(contributor);
  }

  const comboboxMultiData: ItemType<TSearchContributor.Contributor>[] = [
    { data: (data?.internalContributors ?? []).filter(({ githubUserId }) => githubUserId !== value?.githubUserId) },
    {
      label: "External",
      data: (data?.externalContributors ?? []).filter(({ githubUserId }) => githubUserId !== value?.githubUserId),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="relative sm:w-2/3"></div>
      </div>
    </div>
  );
}
