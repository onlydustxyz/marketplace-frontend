import { TInput } from "components/ds/form/input/input.types";

export namespace TUsdInput {
  export interface Props {
    inputProps?: TInput.Props;
    value: string;
    onChange: (value: string) => void;
  }
}
