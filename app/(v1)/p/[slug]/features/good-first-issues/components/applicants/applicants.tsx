"use client";

import { useMemo } from "react";

import { TApplicants } from "app/(v1)/p/[slug]/features/good-first-issues/components/applicants/applicants.types";

import { Typo } from "components/atoms/typo/variants/typo-default";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";

export function Applicants({ applicants }: TApplicants.Props) {
  const sortedByLogin = useMemo(() => {
    return [...applicants].sort((a, b) => a.login.localeCompare(b.login));
  }, [applicants]);

  if (!sortedByLogin.length) {
    return null;
  }

  return (
    <div className="flex">
      <Tooltip content={<ContributorsAvatars.TooltipContent contributors={sortedByLogin} />} canInteract={true}>
        <div className="flex flex-row items-center gap-1 font-walsheim text-snow">
          <ContributorsAvatars contributors={sortedByLogin} avatarProps={{ size: "xs" }} enableTooltip={false} />

          <div className="flex flex-row items-center gap-1 truncate whitespace-nowrap">
            <Typo
              variant="default"
              color="text-2"
              size="xs"
              classNames={{
                base: "truncate",
              }}
              translate={{
                token: "v2.pages.project.overview.goodFirstIssues.applicantCount",
                params: { count: sortedByLogin.length },
              }}
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
