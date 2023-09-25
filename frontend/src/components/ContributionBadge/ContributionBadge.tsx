import classNames from "classnames";

import { Maybe } from "src/__generated/graphql";
import ExternalArrow from "src/assets/icons/ExternalArrow";
import {
  ContributionIcon,
  ContributionIconStatus,
  ContributionIconStatusType,
  ContributionIconType,
  variants as contributionIconVariants,
} from "src/components/ContributionIcon/ContributionIcon";

export enum ContributionBadgeType {
  PullRequest = "PULL_REQUEST",
  Issue = "ISSUE",
  CodeReview = "CODE_REVIEW",
}

export function ContributionBadge({
  number,
  type,
  status,
  draft = false,
  external = false,
}: {
  number: number;
  type: ContributionIconType;
  status: ContributionIconStatusType;
  draft?: Maybe<boolean>; // Matches graphql type
  external?: boolean;
}) {
  return (
    <div
      className={classNames(
        "inline-flex w-auto items-center gap-1 rounded-full px-1 py-0.5 font-walsheim",
        {
          "border border-dashed": external,
          "border-0.5 border-solid": !external,
        },
        contributionIconVariants.status[draft ? ContributionIconStatus.Draft : status]
      )}
    >
      <ContributionIcon type={type} status={draft ? ContributionIconStatus.Draft : status} />
      <div className="flex">
        <span className="text-sm leading-none">{number}</span>
        {external ? <ExternalArrow className="mt-[3px]" /> : null}
      </div>
    </div>
  );
}
