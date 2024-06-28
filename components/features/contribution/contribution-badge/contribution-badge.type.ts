import { ComponentProps } from "react";

import Tooltip from "src/components/Tooltip";
import { Contribution } from "src/types";

export namespace TContributionBadge {
  type contribution = Pick<
    Contribution,
    "id" | "githubNumber" | "githubTitle" | "githubBody" | "githubHtmlUrl" | "githubAuthor" | "githubStatus" | "type"
  > & { status?: Contribution["status"] };
  export interface Props {
    contribution: contribution;
    withTooltip?: boolean;
    asLink?: boolean;
    size?: sizes;
    tooltipProps?: ComponentProps<typeof Tooltip>;
    showExternal?: boolean;
  }

  export interface ContentProps extends Omit<Props, "tooltipProps"> {
    isExternal: boolean;
    tooltipId: string;
  }

  export enum sizes {
    Xs = "text-xs",
    Sm = "text-sm",
    Md = "text-base",
  }
}
