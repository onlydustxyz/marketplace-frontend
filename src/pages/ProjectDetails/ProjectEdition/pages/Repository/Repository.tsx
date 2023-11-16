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
  const installedRepos = form?.watch("githubRepoIds") || [];
  const hasInstalledRepo = useMemo(
    () =>
      organizations.find(
        organization => (organization.repos || []).filter(repo => installedRepos.includes(repo.id)).length > 0
      ),
    [organizations, installedRepos]
  );

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
      <div className="flex flex-col gap-2 rounded-2xl border border-card-border-medium bg-card-background-light px-6 py-8 shadow-light">
        <p className="text-title-s text-center text-white">{T("project.details.edit.repositories.empty.title")}</p>
        <p className="text-body-s flex items-center justify-center gap-1 text-spaceBlue-200">
          <InfoIcon />
          {T("project.details.edit.repositories.empty.message")}
        </p>
      </div>
    );
  }, [organizations, hasInstalledRepo, installedRepos]);

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
