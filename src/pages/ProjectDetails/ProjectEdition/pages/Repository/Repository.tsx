import { useContext, useMemo } from "react";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";
import { EditPanelContext } from "../../components/Panel/context";
import { EditContext } from "../../EditContext";
import { RepositoryOrganization } from "./components/Organization";

export function Repository() {
  const { T } = useIntl();
  const { open } = useContext(EditPanelContext);
  const { form, organizations } = useContext(EditContext);
  const installedRepos = form?.watch("githubRepos") || [];

  const renderOrganization = useMemo(() => {
    if (installedRepos.length && organizations.length) {
      return (
        <div className="flex flex-col gap-6">
          {organizations.map(organization => (
            <RepositoryOrganization key={organization.id} organization={organization} installedRepos={installedRepos} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 rounded-2xl border border-orange-500 bg-orange-900 px-6 py-8 shadow-light">
        <p className="text-title-s text-center text-white">{T("project.details.edit.repositories.empty.title")}</p>
        <p className="text-body-s flex items-center justify-center gap-1 text-orange-500">
          <InfoIcon className="text-orange-500" />
          {T("project.details.edit.repositories.empty.message")}
        </p>
      </div>
    );
  }, [organizations, installedRepos]);

  return (
    <div className="flex w-full flex-col gap-6">
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
