import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Avatar } from "src/components/New/Avatar";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import SubtractLine from "src/icons/SubtractLine";

export default function RepositoriesTab() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { T } = useIntl();

  const { data, isLoading, isError } = ProjectApi.queries.useDetails({ params: { projectKey } });

  function handleRemoveRepo(id: number) {
    // TODO
    alert(id);
  }

  function renderRepositories() {
    if (isLoading) {
      // TODO skeleton ?
      return null;
    }

    if (isError) {
      // TODO
      return <div>Error</div>;
    }

    if (data) {
      return (
        <div>
          {data.organizations?.map(organization => (
            <div
              key={organization.name}
              className="flex w-full flex-col gap-3 rounded-2xl border border-card-border-light bg-card-background-light p-5"
            >
              <Flex justify="start" item="center" gap={2}>
                <Avatar src={organization.avatarUrl ?? ""} alt={organization.name ?? ""} shape="square" />
                <p className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">{organization.name}</p>
              </Flex>
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
                              handleRemoveRepo(repo.id);
                            }}
                            iconOnly
                          >
                            <SubtractLine className="text-base" />
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

    // TODO possible state ?
    return <div>Empty</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button size={ButtonSize.Md}>
          <AddLine className="text-xl" />
          {T("project.details.edit.repositories.addRepositories")}
        </Button>
      </div>
      {renderRepositories()}
    </div>
  );
}
