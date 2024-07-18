import { components } from "src/__generated/api";

import { ShortProject, ShortProjectInterface } from "./short-project-model";

type ProjectResponse = components["schemas"]["ProjectResponse"];

interface ProjectInterface extends ProjectResponse, ShortProjectInterface {}

export class Project extends ShortProject implements ProjectInterface {
  categories!: ProjectResponse["categories"];
  contributorCount!: ProjectResponse["contributorCount"];
  createdAt!: ProjectResponse["createdAt"];
  ecosystems!: ProjectResponse["ecosystems"];
  goodFirstIssueCount!: ProjectResponse["goodFirstIssueCount"];
  hasRemainingBudget!: ProjectResponse["hasRemainingBudget"];
  hiring!: ProjectResponse["hiring"];
  indexedAt!: ProjectResponse["indexedAt"];
  indexingComplete!: ProjectResponse["indexingComplete"];
  invitedLeaders!: ProjectResponse["invitedLeaders"];
  leaders!: ProjectResponse["leaders"];
  longDescription!: ProjectResponse["longDescription"];
  moreInfos!: ProjectResponse["moreInfos"];
  topContributors!: ProjectResponse["topContributors"];

  constructor(readonly props: ProjectResponse) {
    super(props);
    Object.assign(this, props);
  }
}
