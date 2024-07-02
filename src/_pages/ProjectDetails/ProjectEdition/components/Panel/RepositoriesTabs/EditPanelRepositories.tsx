import { useContext, useMemo, useRef, useState } from "react";

import { FieldInput } from "src/components/New/Field/Input";
import { Flex } from "src/components/New/Layout/Flex";
import { useSearchHotKey } from "src/hooks/useSearchHotKey/useSearchHotKey";
import SearchLine from "src/icons/SearchLine";

import { useIntl } from "hooks/translate/use-translate";

import { EditContext } from "../../../EditContext";
import { Organization } from "./components/Organization";
import { useRepositorySearch } from "./hooks/useRepositorySearch";

export const EditPanelRepositories = () => {
  const { T } = useIntl();
  const { organizations } = useContext(EditContext);
  const installedOrganization = useMemo(
    () => organizations.filter(org => org.installationStatus !== "NOT_INSTALLED"),
    [organizations]
  );
  const [search, setSearch] = useState<string>("");
  const filterOrganizationBySearch = useRepositorySearch(search);
  const inputRef = useRef<HTMLInputElement>(null);

  useSearchHotKey({ inputRef });

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
        ref={inputRef}
      />
      {filterOrganizationBySearch(installedOrganization).map(organization => (
        <Organization key={organization.githubUserId} organization={organization} />
      ))}
    </Flex>
  );
};
