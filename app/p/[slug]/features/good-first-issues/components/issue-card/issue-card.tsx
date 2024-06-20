import { useMediaQuery } from "usehooks-ts";

import { OverviewAccordion } from "app/p/[slug]/features/good-first-issues/components/issue-card/components/overview-accordion/overview-accordion";

import { viewportConfig } from "src/config";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { AvatarGroup } from "components/ds/avatar-group/avatar-group";
import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";
import { Contributor } from "components/features/contributor/contributor";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { ApplyButton } from "./components/apply-button/apply-button";
import { TIssueCard } from "./issue-card.types";

export function IssueCard({ issue }: TIssueCard.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const hasApplied = Boolean(issue.currentUserApplication);

  return (
    <Card key={issue.id} background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4 p-5 md:gap-3">
        <Flex justifyContent="between" className="gap-6">
          <Typography variant="body-m-bold" className="line-clamp-2">
            {issue.title}
          </Typography>

          {isMd ? <ApplyButton hasApplied={hasApplied} /> : null}
        </Flex>

        <Flex alignItems="center" className="gap-3 gap-y-2" wrap="wrap">
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-time-line" className="text-spaceBlue-100" />

            <Typography variant="body-xs" className="text-spaceBlue-100">
              {displayRelativeDate(issue.createdAt)}
            </Typography>
          </Flex>

          <Contributor
            login={issue.author.login || ""}
            avatarUrl={issue.author.avatarUrl}
            githubUserId={issue.author.githubUserId}
            isRegistered={issue.author.isRegistered}
            clickable={true}
            typograhy={{ variant: "body-xs" }}
            avatarProps={{ size: "xs" }}
          />

          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-git-repository-line" className="text-spaceBlue-100" />

            <Link href={issue.repository.htmlUrl} className="text-spaceBlue-100">
              <Typography variant="body-xs">{issue.repository.name}</Typography>
            </Link>
          </Flex>
        </Flex>

        <Flex wrap="wrap" className="gap-2">
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-price-tag-3-line" className="text-spaceBlue-100" />

            <Typography
              variant="body-xs"
              className="text-spaceBlue-100"
              translate={{ token: "v2.pages.project.overview.goodFirstIssues.labels.title" }}
            />
          </Flex>

          {issue.applicants.length ? (
            <Flex direction="row" className="gap-4">
              <AvatarGroup
                avatars={issue.applicants.map(applicant => ({
                  src: applicant.avatarUrl,
                  alt: applicant.login,
                }))}
              />
              <Typography
                variant="body-xs"
                className="text-spaceBlue-100"
                translate={{
                  token: "v2.pages.project.overview.goodFirstIssues.applicantCount",
                  params: { count: issue.applicants.length },
                }}
              />
            </Flex>
          ) : null}

          {issue.labels.length > 0 ? (
            <>
              {issue.labels.map(label => (
                <Flex key={label.name} className="rounded-full border border-greyscale-50/8 px-2 py-1">
                  <Typography variant="body-xs" className="whitespace-nowrap">
                    {label.name}
                  </Typography>
                </Flex>
              ))}
            </>
          ) : (
            <Flex className="rounded-full border border-greyscale-50/8 px-2 py-1">
              <Typography
                variant="body-xs"
                translate={{ token: "v2.pages.project.overview.goodFirstIssues.labels.none" }}
              />
            </Flex>
          )}
        </Flex>

        {!isMd ? <ApplyButton hasApplied={hasApplied} /> : null}

        <OverviewAccordion body={issue.body} />
      </Flex>
    </Card>
  );
}
