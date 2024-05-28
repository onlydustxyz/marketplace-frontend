import { GetCommitteeProjectQuestionResponse } from "api-client/resources/committees/types";

export namespace TReadOnlyQuestions {
  export interface Props {
    questions: GetCommitteeProjectQuestionResponse;
  }
}
