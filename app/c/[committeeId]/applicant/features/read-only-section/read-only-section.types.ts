import { GetCommitteeProjectQuestionResponse } from "api-client/resources/committees/types";

export namespace TReadOnlySection {
  export interface Props {
    questions: GetCommitteeProjectQuestionResponse;
  }
}
