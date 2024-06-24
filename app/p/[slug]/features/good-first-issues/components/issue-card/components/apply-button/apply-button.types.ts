import { Dispatch, SetStateAction } from "react";

export namespace TApplyButton {
  export interface Props {
    hasApplied?: boolean;
    drawerState: [boolean, Dispatch<SetStateAction<boolean>>];
  }
}
