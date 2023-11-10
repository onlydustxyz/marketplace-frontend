import { FC, useMemo, useState } from "react";
import { FieldLabel } from "src/components/New/Field/Label";
import { debounce } from "lodash";
import { FieldProjectLeadItem } from "./ProjectLeadItem";
import { Combobox } from "src/components/New/Field/Combobox";
import { useAuth } from "src/hooks/useAuth";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import InformationLine from "src/icons/InformationLine";
import { FieldProjectLeadSelectItem } from "./ProjectLeadISelectItem";
import UsersApi from "src/api/Users";
import { components } from "src/__generated/api";
import { useIntl } from "src/hooks/useIntl";

// TODO : Doc
/**
 * used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-Venus?type=design&node-id=10797-233325&mode=design&t=ES631NUQNvE41TSD-4
 */
// TODO : when a project id is pass to the component use the layout for edition and fetch another API route

type SelectedLeadType = components["schemas"]["ContributorSearchItemResponse"];
export interface FieldProjectLeadValue {
  invited: SelectedLeadType[];
}

export interface FieldProjectLeadProps {
  githubUserId: string;
  onChange?: (props: FieldProjectLeadValue) => void;
  value?: FieldProjectLeadValue;
}

export const FieldProjectLead: FC<FieldProjectLeadProps> = ({ githubUserId, onChange, value }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const { T } = useIntl();

  const { data, isLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: query },
    options: { enabled: query !== "" },
  });

  const contributors = data?.contributors;

  const handleQueryChange = debounce(async (query: string) => {
    setQuery(query);
  }, 500);

  const onRemoveLead = (login: string) => {
    onChange?.({ invited: value?.invited.filter(lead => lead.login !== login) || [] });
  };

  const SelectedLeads = useMemo(
    () => [
      <FieldProjectLeadItem key={user?.id} avatar={user?.avatarUrl ?? ""} isYou label={user?.login ?? ""} />,
      ...(value?.invited || []).map(({ githubUserId, avatarUrl, login }) => (
        <FieldProjectLeadItem
          key={githubUserId}
          avatar={avatarUrl}
          label={login}
          onRemove={() => onRemoveLead(login)}
        />
      )),
    ],
    [value, user]
  );

  function handleChange(value: SelectedLeadType[]) {
    onChange?.({ invited: value });
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel id={githubUserId}>Project leads</FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="relative z-[1] sm:w-2/3">
          <Combobox
            items={contributors ?? []}
            itemKeyName="githubUserId"
            renderItem={({ item, selected }) => (
              <FieldProjectLeadSelectItem
                login={item.login}
                selected={selected}
                avatarUrl={item.avatarUrl}
                isRegistered={item.isRegistered}
              />
            )}
            query={query}
            onQuery={handleQueryChange}
            selected={value?.invited ?? []}
            onChange={handleChange}
            placeholder={T("project.details.create.informations.form.fields.projectLead.placeholderLabel")}
            multiple
            loading={isLoading}
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
