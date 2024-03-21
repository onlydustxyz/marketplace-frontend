import { TButton } from "components/ds/button/button.types";

export namespace TAddMissingRepositories {
  export interface Props {
    url: string;
    disabled?: boolean;
    tooltip: string;
    backgroundColor?: TButton.Props["backgroundColor"];
    className?: string;
  }
}
