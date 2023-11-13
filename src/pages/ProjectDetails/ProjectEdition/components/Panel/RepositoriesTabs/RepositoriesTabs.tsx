import { useContext } from "react";
import { EditContext } from "../../../EditContext";
import { Organization } from "./components/Organization";
import { Flex } from "src/components/New/Layout/Flex";

export const EditPanelRepositories = () => {
  const { form } = useContext(EditContext);
  const organizations = form?.watch("organizations") || [];

  return (
    <Flex justify="start" item="start" className="w-full gap-6" direction="col">
      {organizations.map(organization => (
        <Organization key={organization.id} organization={organization} />
      ))}
    </Flex>
  );
};
