import { format } from "date-fns";

import { Project } from "app/migration/u/[githubLogin]/features/project/project";

import Medal2Fill from "src/icons/Medal2Fill";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";
import { ContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge";
import { TContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge.type";
import { ClientOnly } from "components/layout/client-only/client-only";
import { Typography } from "components/layout/typography/typography";

import { TContributionItem } from "./contribution-item.types";

export function ContributionItem({ contribution, project }: TContributionItem.Props) {
  return (
    <Card background={false} border={"light"} className="flex flex-row items-center justify-between gap-3">
      <div className="border-r border-r-card-border-light pr-3">
        <Project slug={project.slug}>
          <AvatarLabelled
            avatarProps={{ src: project.logoUrl, size: "s", shape: "square" }}
            labelProps={{ className: "hover:text-spacePurple-500 transition-all" }}
          >
            {project.name}
          </AvatarLabelled>
        </Project>
      </div>
      <div className="flex flex-1 flex-row items-center justify-start gap-2 overflow-hidden">
        <ClientOnly>
          <ContributionBadge contribution={contribution} size={TContributionBadge.sizes.Xs} />
        </ClientOnly>
        <Link href={contribution.githubHtmlUrl} className="truncate break-all text-left">
          {contribution.githubTitle}
        </Link>
      </div>
      <div className="flex items-center justify-end gap-3">
        {!contribution?.rewardIds?.length ? (
          <div className="rounded-full border border-card-border-light bg-card-background-light px-3">
            <Medal2Fill className="text-sm leading-none text-orange-400" />
          </div>
        ) : null}
        {contribution.completedAt ? (
          <Typography variant="body-s" className="text-spaceBlue-200">
            {format(new Date(contribution.completedAt), "MMM dd, yyyy")}
          </Typography>
        ) : null}
      </div>
    </Card>
  );
}
