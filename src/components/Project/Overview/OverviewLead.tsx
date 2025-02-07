import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export interface ProjectOverviewLeadProps {
  projectId: string;
  projectLeads: UseGetProjectBySlugResponse["leaders"];
}

export const ProjectOverviewLead = () => {
  return <div></div>;
};
