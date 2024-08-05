import { Selection } from "@nextui-org/react";
import { useMemo } from "react";

import { TProjectSelection } from "app/(v1)/c/[committeeId]/applicant/features/project-selection/project-selection.types";

import { Avatar } from "components/ds/avatar/avatar";
import { Select } from "components/ds/form/select/select";

import { useIntl } from "hooks/translate/use-translate";
import { useProjectsLead } from "hooks/users/use-projects-lead/use-projects-lead";

export function ProjectSelection({ projectId, onChange, isLoading }: TProjectSelection.Props) {
  const { T } = useIntl();
  const { projectsLead, isLoading: isProjectsLeadLoading } = useProjectsLead();

  const projects = useMemo(
    () =>
      projectsLead?.map(p => ({
        label: p.name,
        value: p.id,
        startContent: <Avatar src={p.logoUrl} size={"s"} shape={"square"} className={"mx-1"} />,
      })) ?? [],
    [projectsLead]
  );

  const selectedProject = useMemo(() => projects.find(p => p.value === projectId), [projects, projectId]);

  function handleProjectChange(keys: Selection) {
    const [projectId] = keys;

    if (typeof projectId === "string") {
      onChange(projectId);
    }
  }

  return (
    <Select
      aria-label={T("v2.pages.committees.applicant.private.project.select")}
      defaultSelectedKeys={projectId ? [projectId] : undefined}
      disabledKeys={projectId ? [projectId] : undefined}
      startContent={selectedProject?.startContent}
      items={projects}
      onSelectionChange={handleProjectChange}
      size={"lg"}
      variant={"grey"}
      isLoading={isLoading || isProjectsLeadLoading}
      placeholder={T("v2.pages.committees.applicant.private.project.select")}
      isRequired
    />
  );
}
