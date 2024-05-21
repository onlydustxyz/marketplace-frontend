import { components } from "src/__generated/api";

type CommitteeApplicationResponse = components["schemas"]["CommitteeApplicationResponse"];

export interface GetCommitteeProjectApplicationResponse extends CommitteeApplicationResponse {}

export interface UpdateCommitteeProjectApplicationParams {
  committeeId: string;
  projectId: string;
}

type CommitteeApplicationRequest = components["schemas"]["CommitteeApplicationRequest"];

export interface UpdateCommitteeProjectApplicationVariables extends CommitteeApplicationRequest {}
