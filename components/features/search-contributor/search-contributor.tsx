import { debounce } from "lodash";
import { useState } from "react";

import UsersApi from "src/api/Users";
import { Combobox, Variant } from "src/components/New/Field/Combobox/Combobox";
import { ItemType } from "src/components/New/Field/Combobox/MultiList";
import { useIntl } from "src/hooks/useIntl";

import { TSearchContributor } from "./search-contributor.types";
import { SelectableItem } from "./selectable-item/selectable-item";

// TODO: Change ComboBox component SingleList to MultiList it's the same
// TODO: Check the problem with internal contributor
// TODO: Add a custom render on selected as props
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

  console.log("comboboxMultiData", comboboxMultiData);
  console.log("value", value);
  console.log("query", query);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="relative sm:w-2/3">
          <Combobox
            items={comboboxMultiData}
            itemKeyName="githubUserId"
            renderItem={({ item }) => (
              <SelectableItem
                login={item.login}
                selected={item.githubUserId === value?.githubUserId}
                avatarUrl={item.avatarUrl}
                isRegistered={item.isRegistered || false}
              />
            )}
            query={query}
            onQuery={handleQueryChange}
            selected={value}
            onChange={handleChange}
            placeholder={T("project.details.create.informations.form.fields.projectLead.placeholderLabel")}
            loading={isLoading}
            variant={Variant.Grey}
          />
        </div>
      </div>
    </div>
  );
}
