import { FC, useMemo } from "react";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { components } from "src/__generated/api";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { Repository } from "./Repository";
import InformationLine from "src/icons/InformationLine";

export interface OrganizationProps {
  organization: components["schemas"]["ProjectGithubOrganizationResponse"];
}
export const Organization: FC<OrganizationProps> = ({ organization }) => {
  const { T } = useIntl();
  const unInstalledRepo = useMemo(
    () => organization.repos?.filter(repo => !repo.isIncludedInProject) || [],
    [organization]
  );

  const repositories = useMemo(() => {
    if (unInstalledRepo?.length) {
      return unInstalledRepo.map(repo => <Repository key={repo.id} organization={organization} repository={repo} />);
    }

    return (
      <div className="flex flex-row items-center justify-start gap-0.5">
        <InformationLine className="text-base leading-4 text-spaceBlue-200" />
        <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
          {T("project.details.edit.panel.repositories.noRepositoriesToAdd")}
        </p>
      </div>
    );
  }, [organization, unInstalledRepo]);

  return (
    <div className="w-full">
      <VerticalListItemCard
        ContainerProps={{ className: "bg-transparent" }}
        key={organization.name || organization?.login}
        title={organization?.name || organization?.login || ""}
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
      >
        <Flex justify="start" item="start" className="w-full gap-3" direction="col">
          {repositories}
        </Flex>
      </VerticalListItemCard>
    </div>
  );
};
