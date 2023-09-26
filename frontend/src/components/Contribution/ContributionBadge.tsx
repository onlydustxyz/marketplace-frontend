import classNames from "classnames";

import { Maybe } from "src/__generated/graphql";
import ExternalArrow from "src/assets/icons/ExternalArrow";
import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import { GithubContributionIconStatus, GithubContributionIconStatusType, GithubContributionType } from "src/types";

export function ContributionBadge({
  number,
  type,
  status,
  draft = false,
  external = false,
}: {
  number: number;
  type: GithubContributionType;
  status: GithubContributionIconStatusType;
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
        contributionIconVariants.status[draft ? GithubContributionIconStatus.Draft : status]
      )}
    >
      <ContributionIcon type={type} status={draft ? GithubContributionIconStatus.Draft : status} />
      <div className="flex">
        <span className="text-sm leading-none">{number}</span>
        {external ? <ExternalArrow className="mt-[3px]" /> : null}
      </div>
    </div>
  );
}
