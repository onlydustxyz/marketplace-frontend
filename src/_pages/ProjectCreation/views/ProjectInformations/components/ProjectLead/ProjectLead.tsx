import { debounce, uniqWith } from "lodash";
import { FC, useContext, useMemo, useState } from "react";

import { EditContext } from "src/_pages/ProjectDetails/ProjectEdition/EditContext";
import UsersApi from "src/api/Users";
import { Combobox, Variant } from "src/components/New/Field/Combobox/Combobox";
import { ItemType } from "src/components/New/Field/Combobox/MultiList";
import { FieldLabel } from "src/components/New/Field/Label";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { FieldProjectLeadSelectItem } from "./ProjectLeadISelectItem";
import { FieldProjectLeadItem } from "./ProjectLeadItem";

export type SelectedLeadType = {
  avatarUrl?: string;
  id?: string;
  githubUserId?: number;
  login: string;
  name?: string;
  isRegistered?: boolean;
};

export interface FieldProjectLeadValue {
  invited: SelectedLeadType[];
  toKeep: SelectedLeadType[];
}

export interface FieldProjectLeadProps {
  name: string;
  onChange?: (props: FieldProjectLeadValue) => void;
  value?: FieldProjectLeadValue;
}

export const FieldProjectLead: FC<FieldProjectLeadProps> = ({ name, onChange, value }) => {
  const { user } = useCurrentUser();
  const { githubUserId, avatarUrl = "", login = "" } = user || {};
  const [query, setQuery] = useState("");
  const { project } = useContext(EditContext);
  const { T } = useIntl();

  const { data, isLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: query, projectId: project?.id },
  });

  const currentLeaders = [value?.invited, value?.toKeep].flatMap(lead => lead?.map(lead => lead.githubUserId));

  const handleQueryChange = debounce(async (query: string) => {
    setQuery(query);
  }, 500);

  const onRemoveLead = (login: string) => {
    onChange?.({
      invited: value?.invited.filter(lead => lead.login !== login) || [],
      toKeep: value?.toKeep.filter(lead => lead.login !== login) || [],
    });
  };

  const selectedLeads = useMemo(
    () => [
      <FieldProjectLeadItem key={githubUserId} avatar={avatarUrl} isYou label={login} />,
      ...(value?.toKeep || [])
        .filter(lead => lead.id !== user?.id)
        .map(({ githubUserId, avatarUrl, login }) => (
          <FieldProjectLeadItem
            key={githubUserId}
            avatar={avatarUrl}
            label={login}
            onRemove={() => onRemoveLead(login)}
          />
        )),
      ...(value?.invited || []).map(({ githubUserId, avatarUrl, login }) => (
        <FieldProjectLeadItem
          key={githubUserId}
          avatar={avatarUrl}
          label={login}
          isPending
          onRemove={() => onRemoveLead(login)}
        />
      )),
    ],
    [value, user]
  );

  const selectedLeadsIds = useMemo(() => {
    return [...(value?.toKeep ?? []), ...(value?.invited ?? [])].map(({ githubUserId }) => githubUserId);
  }, [value]);

  function handleChange(leader: SelectedLeadType[]) {
    onChange?.({
      invited: [...uniqWith(leader, (arrVal, othVal) => arrVal.githubUserId === othVal.githubUserId)],
      toKeep: value?.toKeep || [],
    });
  }

  const comboboxMultiData: ItemType<SelectedLeadType>[] = [
    { data: (data?.internalContributors ?? []).filter(({ githubUserId }) => !selectedLeadsIds.includes(githubUserId)) },
    {
      label: "External",
      data: (data?.externalContributors ?? []).filter(({ githubUserId }) => !selectedLeadsIds.includes(githubUserId)),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel id={name}>Project leads</FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="relative sm:w-2/3">
          <Combobox
            items={comboboxMultiData}
            itemKeyName="githubUserId"
            renderItem={({ item }) => (
              <FieldProjectLeadSelectItem
                login={item.login}
                selected={currentLeaders.includes(item.githubUserId)}
                avatarUrl={item.avatarUrl}
                isRegistered={item.isRegistered || false}
              />
            )}
            query={query}
            onQuery={handleQueryChange}
            selected={value?.invited ?? []}
            onChange={handleChange}
            placeholder={T("project.details.create.informations.form.fields.projectLead.placeholderLabel")}
            loading={isLoading}
            variant={Variant.Grey}
            isMultiList
            multiple
          />
        </div>
        <div className="flex flex-wrap gap-3">{selectedLeads}</div>
      </div>
    </div>
  );
};
