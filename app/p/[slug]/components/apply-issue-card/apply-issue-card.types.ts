import { PropsWithChildren } from "react";

import { PaperPort } from "components/atoms/paper";
import { TypoPort } from "components/atoms/typo/typo.types";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TApplyIssueCard {
  export interface Props extends PropsWithChildren {
    container?: PaperPort<"article">["container"];
    iconProps?: TIcon.Props;
    titleProps: TypoPort<"span">;
    className?: string;
  }
}
