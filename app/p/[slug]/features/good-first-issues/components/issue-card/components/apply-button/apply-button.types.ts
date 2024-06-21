import { Dispatch, SetStateAction } from "react";

export namespace TApplyButton {
  export interface Props {
    hasApplied?: boolean;
    state: [boolean, Dispatch<SetStateAction<boolean>>];
  }
}
