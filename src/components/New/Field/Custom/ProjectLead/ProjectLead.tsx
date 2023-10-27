import { FC, useEffect, useMemo, useState } from "react";
import { FieldLabel } from "src/components/New/Field/Label";
import { debounce } from "lodash";
import { FieldProjectLeadItem } from "./ProjectLeadItem";
import { Combobox } from "src/components/New/Field/Combobox";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useAuth } from "src/hooks/useAuth";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import InformationLine from "src/icons/InformationLine";
import { FieldProjectLeadSelectItem } from "./ProjectLeadISelectItem";

// TODO : Doc
/**
 * used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-Venus?type=design&node-id=10797-233325&mode=design&t=ES631NUQNvE41TSD-4
 */
// TODO : when a project id is pass to the component use the layout for edition and fetch another API route
interface GithubUser {
  id: number;
  login: string;
  avatarUrl: string;
  isRegistered: boolean;
}

export interface FieldProjectLeadValue {
  invited: number[];
}

export interface FieldProjectLeadProps {
  id: string;
  onChange?: (props: FieldProjectLeadValue) => void;
  value?: FieldProjectLeadValue;
}

const fakeData: GithubUser[] = [
  {
    id: 123,
    login: "123",
    avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
    isRegistered: false,
  },
  {
    id: 456,
    login: "456",
    avatarUrl: "https://avatars.githubusercontent.com/u/17259618?v=4",
    isRegistered: true,
  },
];

export const FieldProjectLead: FC<FieldProjectLeadProps> = ({ id, onChange, value }) => {
  // export const FieldProjectLead = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const queryParams = useMemo(() => [{ key: "search", value: [query] }], [query]);

  const { data, isLoading, isError } = useRestfulData<GithubUser[]>({
    resourcePath: ApiResourcePaths.GET_GITHUB_USERS,
    queryParams: queryParams,
    method: "GET",
    retry: false,
    enabled: false,
  });

  const [selectedLead, setSelectedLead] = useState<GithubUser[]>([]);

  useEffect(() => {
    if (!selectedLead.length && fakeData && value?.invited?.length) {
      const findSelectedLead = value.invited
        .map(invited => fakeData.find(lead => lead.id === invited))
        .filter(l => l !== undefined);

      setSelectedLead(findSelectedLead as GithubUser[]);
    }
  }, [fakeData, value]);

  const handleQueryChange = debounce(async (query: string) => {
    setQuery(query);
  }, 500);

  const onRemoveLead = (login: string) => {
    setSelectedLead(selectedLead.filter(lead => lead.login !== login));
  };

  useEffect(() => {
    if (onChange) {
      onChange({ invited: selectedLead.map(lead => lead.id) });
    }
  }, [selectedLead]);

  const SelectedLeads = useMemo(
    () => [
      <FieldProjectLeadItem key={user?.id} avatar={user?.avatarUrl ?? ""} isYou label={user?.login ?? ""} />,
      ...selectedLead.map(({ id, avatarUrl, login }) => (
        <FieldProjectLeadItem key={id} avatar={avatarUrl} label={login} onRemove={() => onRemoveLead(login)} />
      )),
    ],
    [selectedLead, user]
  );

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel id={id}>Project leads</FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="relative sm:w-2/3">
          <Combobox
            items={fakeData}
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
