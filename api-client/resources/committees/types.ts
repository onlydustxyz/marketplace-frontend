import { components } from "src/__generated/api";

type CommitteeApplicationResponse = components["schemas"]["CommitteeApplicationResponse"];
type CommitteeProjectQuestionResponse = components["schemas"]["CommitteeProjectQuestionResponse"][];

export interface GetCommitteeProjectApplicationResponse extends CommitteeApplicationResponse {}
export interface GetCommitteeProjectQuestionResponse extends CommitteeProjectQuestionResponse {}
