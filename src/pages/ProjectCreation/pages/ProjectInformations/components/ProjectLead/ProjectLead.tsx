import { FC, useEffect, useMemo, useState } from "react";
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

// TODO : Doc
/**
 * used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-Venus?type=design&node-id=10797-233325&mode=design&t=ES631NUQNvE41TSD-4
 */
// TODO : when a project id is pass to the component use the layout for edition and fetch another API route
export interface FieldProjectLeadValue {
  invited: number[];
}

export interface FieldProjectLeadProps {
  githubUserId: string;
  onChange?: (props: FieldProjectLeadValue) => void;
  value?: FieldProjectLeadValue;
}

export const FieldProjectLead: FC<FieldProjectLeadProps> = ({ githubUserId, onChange, value }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = UsersApi.queries.useUsers({
    params: { login: query },
    options: { enabled: query !== "" },
  });

  const [selectedLead, setSelectedLead] = useState<components["schemas"]["ContributorSearchItemResponse"][]>([]);

  useEffect(() => {
    if (!selectedLead.length && data && value?.invited?.length) {
      const findSelectedLead = value.invited
        .map(invited => data.find(lead => lead.githubUserId === invited))
        .filter(l => l !== undefined);

      setSelectedLead(findSelectedLead as components["schemas"]["ContributorSearchItemResponse"][]);
    }
  }, [data, value]);

  const handleQueryChange = debounce(async (query: string) => {
    setQuery(query);
  }, 500);

  const onRemoveLead = (login: string) => {
    setSelectedLead(selectedLead.filter(lead => lead.login !== login));
  };

  useEffect(() => {
    if (onChange) {
      onChange({ invited: selectedLead.map(lead => lead.githubUserId) });
    }
  }, [selectedLead]);

  const SelectedLeads = useMemo(
    () => [
      <FieldProjectLeadItem key={user?.id} avatar={user?.avatarUrl ?? ""} isYou label={user?.login ?? ""} />,
      ...selectedLead.map(({ githubUserId, avatarUrl, login }) => (
        <FieldProjectLeadItem
          key={githubUserId}
          avatar={avatarUrl}
          label={login}
          onRemove={() => onRemoveLead(login)}
        />
      )),
    ],
    [selectedLead, user]
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel id={githubUserId}>Project leads</FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="relative sm:w-2/3">
          <Combobox
            // Need to ask backend why do we have this distinction between external and internal contributors
            items={data?.externalContributors ?? []}
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
            selected={selectedLead}
            onChange={setSelectedLead}
            placeholder="Pick a contributor or type in Github handle"
            multiple
            loading={isLoading}
          />
        </div>
        <div className="flex flex-wrap gap-3">{SelectedLeads}</div>
        <FieldInfoMessage icon={({ className }) => <InformationLine className={className} />}>
          To remove a project lead, ask us using the feedback form in the header.
        </FieldInfoMessage>
      </div>
    </div>
  );
};
