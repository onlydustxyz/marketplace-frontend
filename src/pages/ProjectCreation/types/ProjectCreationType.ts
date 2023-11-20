import { components } from "src/__generated/api";
import { SelectedLeadType } from "../views/ProjectInformations/components/ProjectLead/ProjectLead";

export interface CreateFormDataRepos {
    repoId: number;
    orgId: number;
}

export type CreateFormData = components["schemas"]["CreateProjectRequest"] & {
  selectedRepos: CreateFormDataRepos[]
  projectLeads: SelectedLeadType[];
  moreInfo: components["schemas"]["MoreInfo"]
  search: string;
};
