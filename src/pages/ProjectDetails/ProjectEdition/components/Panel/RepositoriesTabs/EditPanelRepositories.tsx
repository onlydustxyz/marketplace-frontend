import { useContext, useMemo } from "react";
import { EditContext } from "../../../EditContext";
import { Organization } from "./components/Organization";
import { Flex } from "src/components/New/Layout/Flex";

export const EditPanelRepositories = () => {
  const { organizations } = useContext(EditContext);
  const installedOrganization = useMemo(() => organizations.filter(org => org.installed), [organizations]);

  return (
    <Flex justify="start" item="start" className="w-full gap-6" direction="col">
      {installedOrganization.map(organization => (
        <Organization key={organization.id} organization={organization} />
      ))}
    </Flex>
  );
};
