import { FC, useContext, useMemo, useState } from "react";
import { FieldLabel } from "src/components/New/Field/Label";
import { debounce, uniqWith } from "lodash";
import { FieldProjectLeadItem } from "./ProjectLeadItem";
import { useAuth } from "src/hooks/useAuth";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import InformationLine from "src/icons/InformationLine";
import { FieldProjectLeadSelectItem } from "./ProjectLeadISelectItem";
import UsersApi from "src/api/Users";
import { useIntl } from "src/hooks/useIntl";
import { Combobox, Variant } from "src/components/New/Field/Combobox/Combobox";
import { ItemType } from "src/components/New/Field/Combobox/MultiList";
import { EditContext } from "src/pages/ProjectDetails/ProjectEdition/EditContext";

// TODO : Doc
/**
 * used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-Venus?type=design&node-id=10797-233325&mode=design&t=ES631NUQNvE41TSD-4
 */
// TODO : when a project id is pass to the component use the layout for edition and fetch another API route

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
  const { user } = useAuth();
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

  const SelectedLeads = useMemo(
    () => [
      <FieldProjectLeadItem key={user?.id} avatar={user?.avatarUrl ?? ""} isYou label={user?.login ?? ""} />,
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

  function handleChange(leader: SelectedLeadType[]) {
    onChange?.({
      invited: [...uniqWith(leader, (arrVal, othVal) => arrVal.githubUserId === othVal.githubUserId)],
      toKeep: value?.toKeep || [],
    });
  }

  const comboboxMultiData: ItemType<SelectedLeadType>[] = [
    { data: data?.internalContributors || [] },
    { label: "External", data: data?.externalContributors || [] },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel id={name}>Project leads</FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="relative z-[1] sm:w-2/3">
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
        <div className="flex flex-wrap gap-3">{SelectedLeads}</div>
        <FieldInfoMessage icon={({ className }) => <InformationLine className={className} />}>
          {T("project.details.create.informations.form.fields.projectLead.info")}
        </FieldInfoMessage>
      </div>
    </div>
  );
};
