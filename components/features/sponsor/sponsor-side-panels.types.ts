import { TButton } from "components/ds/button/button.types";
import { TSponsorProjectStack } from "components/features/stacks/sponsor-project-stack/sponsor-project-stack.types";

export namespace TSponsorSidePanels {
  export interface Props {
    panel: "fillout" | "project";
    buttonProps?: TButton.Props;
    project?: TSponsorProjectStack.Props["project"];
  }
}
