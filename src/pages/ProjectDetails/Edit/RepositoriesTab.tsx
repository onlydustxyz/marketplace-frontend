<<<<<<< Updated upstream
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
=======
import { useState } from "react";
import { useDetailsResponse } from "src/api/Project/queries";
>>>>>>> Stashed changes
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Avatar } from "src/components/New/Avatar";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import SubtractLine from "src/icons/SubtractLine";
import { EditPanelContext } from "./components/Panel/context";

<<<<<<< Updated upstream
export default function RepositoriesTab() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { T } = useIntl();
  const { open } = useContext(EditPanelContext);
  // TODO move to parent
  const { data, isLoading, isError } = ProjectApi.queries.useDetails({
    params: { projectKey },
    options: { refetchOnMount: false, refetchOnWindowFocus: false },
  });
=======
type RepositoriesTabType = {
  data: useDetailsResponse;
  isLoading: boolean;
  isError: boolean;
};

export default function RepositoriesTab({ data, isLoading, isError }: RepositoriesTabType) {
  const { T } = useIntl();
>>>>>>> Stashed changes

  // TODO move to parent
  const [repositoriesData, setRepositoriesData] = useState<typeof data>(data);

  function handleRemoveRepo(orgId?: number, repoId?: number) {
    if (orgId && repoId) {
      const { organizations } = repositoriesData ?? {};

      // Remove repo from org
      const filteredOrgRepos = organizations?.find(({ id }) => id === orgId)?.repos?.filter(({ id }) => id !== repoId);

      let filteredOrgs: typeof organizations;

      // If org still has repos -> update orgs
      if (filteredOrgRepos?.length) {
        filteredOrgs = organizations?.map(org => {
          if (org.id === orgId) {
            return {
              ...org,
              repos: filteredOrgRepos,
            };
          }

          return org;
        });
      } else {
        // If org empty -> remove it
        filteredOrgs = organizations?.filter(({ id }) => id !== orgId);
      }

      // Remove repo from repos
      const filteredRepos = repositoriesData?.repos?.filter(({ id }) => id !== repoId);

      setRepositoriesData(prevState =>
        // Can't use spread operator due to Typescript mismatch
        Object.assign({}, prevState, { organizations: filteredOrgs, repos: filteredRepos })
      );
    }
  }

  function renderRepositories() {
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

    if (repositoriesData?.organizations?.length) {
      return (
        <div>
          {repositoriesData.organizations.map(organization => (
            <div
              key={organization.name}
              className="flex w-full flex-col gap-3 rounded-2xl border border-card-border-light bg-card-background-light p-5"
            >
              <div className="flex items-center gap-2">
                <Avatar src={organization.avatarUrl ?? ""} alt={organization.name ?? ""} shape="square" />
                <p className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">{organization.name}</p>
              </div>
              <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
                {organization.repos?.map(repo => (
                  <div
                    key={repo.name}
                    className="flex basis-1/2 flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex w-full items-center justify-between">
                          <h3 className="text-body-m-bold">{repo.name}</h3>
                          <Button
                            size={ButtonSize.Sm}
                            type={ButtonType.Secondary}
                            onClick={() => {
                              handleRemoveRepo(organization.id, repo.id);
                            }}
                            iconOnly
                          >
                            <SubtractLine className="text-base" />
                            <span className="sr-only">{T("project.details.edit.repositories.removeRepository")}</span>
                          </Button>
                        </div>
                        <p className={`text-body-s text-greyscale-200 ${!repo.description && "italic"}`}>
                          {repo.description || T("project.details.overview.repositories.descriptionPlaceholder")}
                        </p>
                      </div>
                      <ul className="flex items-center gap-5 fill-greyscale-200 font-walsheim font-medium text-greyscale-200">
                        <li className="flex items-center gap-1">
                          <StarLine className="text-base" />
                          <span className="text-sm">{repo.stars}</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ForkLine />
                          <span className="text-sm">{repo.forkCount}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button size={ButtonSize.Md} onClick={open}>
          <AddLine className="text-xl" />
          {T("project.details.edit.repositories.addRepositories")}
        </Button>
      </div>
      {renderRepositories()}
    </div>
  );
}
