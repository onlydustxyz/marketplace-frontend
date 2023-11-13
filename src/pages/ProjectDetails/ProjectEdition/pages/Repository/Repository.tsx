import { useContext, useMemo } from "react";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";
import { EditPanelContext } from "../../components/Panel/context";
import { EditContext } from "../../EditContext";
import { RepositoryOrganization } from "./components/Organization";

type RepositoriesTabType = {
  // to remove
  isLoading: boolean;
  // to remove
  isError: boolean;
};

export function Repository({ isLoading, isError }: RepositoriesTabType) {
  const { T } = useIntl();
  const { open } = useContext(EditPanelContext);
  const { form, formHelpers } = useContext(EditContext);
  const organizations = form?.watch("organizations") || [];

  const renderOrganization = useMemo(() => {
    if (isLoading) {
      // TODO skeleton ?
      return null;
    }

    if (isError) {
      return (
        <div className="py-24">
          <p className="text-center font-walsheim text-sm text-greyscale-50">
            {T("project.details.edit.repositories.error")}
          </p>
        </div>
      );
    }

    if (organizations.length) {
      return (
        <div>
          {organizations.map(organization => (
            <RepositoryOrganization key={organization.name} organization={organization} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 rounded-2xl border border-card-border-medium bg-card-background-light px-6 py-8 shadow-light">
        <p className="text-title-s text-center text-white">{T("project.details.edit.repositories.empty.title")}</p>
        <p className="text-body-s flex items-center justify-center gap-1 text-spaceBlue-200">
          <InfoIcon />
          {T("project.details.edit.repositories.empty.message")}
        </p>
      </div>
    );
  }, [isLoading, isError, organizations, organizations]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button size={ButtonSize.Md} onClick={open}>
          <AddLine className="text-xl" />
          {T("project.details.edit.repositories.addRepositories")}
        </Button>
      </div>
      {renderOrganization}
    </div>
  );
}
