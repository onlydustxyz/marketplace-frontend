import { components } from "src/__generated/api";
import { SelectedLeadType } from "../views/ProjectInformations/components/ProjectLead/ProjectLead";

// export interface CreateFormData {
//   githubRepoIds: number[];
//   projectLeads: SelectedLeadType[];
//   inviteGithubUserIdsAsProjectLeads: number[];
//   isLookingForContributors: boolean;
//   longDescription: string;
//   name: string;
//   logoUrl?: string;
//   moreInfo: {
//     url: string;
//     value: string;
//   };
//   shortDescription: string;
// }

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
