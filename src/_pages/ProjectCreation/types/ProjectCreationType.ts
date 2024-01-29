import { components } from "src/__generated/api";
import { MoreInfosField } from "src/types";

import { SelectedLeadType } from "../views/ProjectInformations/components/ProjectLead/ProjectLead";

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
