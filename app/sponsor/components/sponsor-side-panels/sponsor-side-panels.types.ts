import { TButton } from "components/ds/button/button.types";

export namespace TSponsorSidePanels {
  export interface Props {
    panel: "fillout" | "project";
    buttonProps?: TButton.Props;
  }
}
