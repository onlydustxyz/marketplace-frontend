import Button, { ButtonSize, ButtonType } from "src/components/Button";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import SubtractLine from "src/icons/SubtractLine";
import { components } from "src/__generated/api";
import { useContext } from "react";
import { EditContext } from "../../../EditContext";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

type RepositoryType = {
  organization: components["schemas"]["GithubOrganizationResponse"];
  repository: components["schemas"]["GithubOrganizationResponse"]["repos"][number];
};

export function Repository({ organization, repository }: RepositoryType) {
  const { T } = useIntl();
  const { formHelpers } = useContext(EditContext);

  function handleRemoveRepo(orgId?: number, repoId?: number) {
    if (orgId && repoId) {
      formHelpers.removeRepository(orgId, repoId);
    }
  }

  return (
    <div
      className={cn(
        "flex basis-1/2 flex-col gap-2 rounded-2xl border border-card-border-medium bg-card-background-medium p-5 shadow-heavy",
        { "border-orange-500": !repository.isAuthorizedInGithubApp }
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-body-m-bold">{repository.name}</h3>
            <Button
              size={ButtonSize.Sm}
              type={ButtonType.Secondary}
              onClick={() => {
                handleRemoveRepo(organization.id, repository.id);
              }}
              iconOnly
            >
              <SubtractLine className="text-base" />
              <span className="sr-only">{T("project.details.edit.repositories.removeRepository")}</span>
            </Button>
          </div>
          <p className={`text-body-s text-greyscale-200 ${!repository.description && "italic"}`}>
            {repository.description || T("project.details.overview.repositories.descriptionPlaceholder")}
          </p>
        </div>
        <ul className="flex items-center gap-5 fill-greyscale-200 font-walsheim font-medium text-greyscale-200">
          <li className="flex items-center gap-1">
            <StarLine className="text-base" />
            <span className="text-sm">{repository.stars}</span>
          </li>
          <li className="flex items-center gap-1">
            <ForkLine />
            <span className="text-sm">{repository.forkCount}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
