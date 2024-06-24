import { PropsWithChildren } from "react";

import { TPaperProps } from "components/atoms/paper";
import { TTypoProps } from "components/atoms/typo/typo.types";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TApplyIssueCard {
  export interface Props extends PropsWithChildren {
    container?: TPaperProps<"article">["container"];
    iconProps: TIcon.Props;
    titleProps: TTypoProps<"span">;
    className?: string;
  }
}
