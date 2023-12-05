import { components } from "src/__generated/api";
import { SelectedLeadType } from "../views/ProjectInformations/components/ProjectLead/ProjectLead";
import { MoreInfosField } from "src/types";

export interface CreateFormDataRepos {
  repoId: number;
  orgId: number;
}

export type CreateFormData = Omit<components["schemas"]["CreateProjectRequest"], "moreInfos"> & {
  selectedRepos: CreateFormDataRepos[];
  projectLeads: SelectedLeadType[];
  moreInfos: MoreInfosField[];
  search: string;
};
