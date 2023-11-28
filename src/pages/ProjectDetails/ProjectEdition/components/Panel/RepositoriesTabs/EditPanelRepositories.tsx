import { useContext, useMemo, useState } from "react";
import { EditContext } from "../../../EditContext";
import { Organization } from "./components/Organization";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldInput } from "src/components/New/Field/Input";
import SearchLine from "src/icons/SearchLine";
import { useIntl } from "src/hooks/useIntl";
import { useRepositorySearch } from "./hooks/useRepositorySearch";

export const EditPanelRepositories = () => {
  const { T } = useIntl();
  const { organizations } = useContext(EditContext);
  const installedOrganization = useMemo(() => organizations.filter(org => org.installed), [organizations]);
  const [search, setSearch] = useState<string>("");
  const filterOrganizationBySearch = useRepositorySearch(search);
  return (
    <Flex justify="start" item="start" className="w-full gap-6" direction="col">
      <div>
        <div className="text-title-s pb-2 font-normal text-greyscale-50">
          {T("project.details.edit.panel.repositories.title")}
        </div>
        <div className="text-body-s font-walsheim font-normal text-spaceBlue-100">
          {T("project.details.edit.panel.repositories.description")}
        </div>
      </div>
      <FieldInput
        name="search"
        value={search}
        placeholder={T("project.details.create.repository.search")}
        onChange={e => setSearch(e.target.value)}
        startIcon={({ className }) => <SearchLine className={className} />}
      />
      {/* <div className="w-full"> */}
      {filterOrganizationBySearch(installedOrganization).map(organization => (
        <Organization key={organization.id} organization={organization} />
      ))}
      {/* </div> */}
    </Flex>
  );
};
