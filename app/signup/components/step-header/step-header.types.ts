import { TTranslate } from "components/layout/translate/translate.types";

export namespace TStepHeader {
  export interface Props {
    step: 1 | 2 | 3;
    stepPath: string;
    subStep?: TTranslate.Props;
  }
}
