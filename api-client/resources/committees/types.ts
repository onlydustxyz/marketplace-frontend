import { components } from "src/__generated/api";

type CommitteeApplicationResponse = components["schemas"]["CommitteeApplicationResponse"];
type CommitteeProjectQuestionResponse = components["schemas"]["CommitteeProjectQuestionResponse"][];
type CommitteePublicResponse = components["schemas"]["CommitteeResponse"];
export interface GetCommitteeProjectApplicationResponse extends CommitteeApplicationResponse {}
export interface GetCommitteeProjectQuestionResponse extends CommitteeProjectQuestionResponse {}
export interface GetCommitteePublicResponse extends CommitteePublicResponse {}
export interface UpdateCommitteeProjectApplicationParams {
  committeeId: string;
  projectId: string;
}

type CommitteeApplicationRequest = components["schemas"]["CommitteeApplicationRequest"];

export interface UpdateCommitteeProjectApplicationVariables extends CommitteeApplicationRequest {}
