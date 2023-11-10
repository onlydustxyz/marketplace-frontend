import { useContext, useMemo } from "react";
import { EditContext } from "../../../EditContext";
import { Organization } from "./components/Organization";

export const EditPanelRepositories = () => {
  const { form } = useContext(EditContext);

  const organizations = useMemo(() => form?.getValues("organizations") || [], [form]);
  return (
    <div>
      {organizations.map(organization => (
        <Organization key={organization.id} organization={organization} />
      ))}
    </div>
  );
};
