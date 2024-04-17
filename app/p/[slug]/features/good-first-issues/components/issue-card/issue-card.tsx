import displayRelativeDate from "src/utils/displayRelativeDate";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";
import { Contributor } from "components/features/contributor/contributor";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TIssueCard } from "./issue-card.types";

// TODO: Add applicants (back too)
// TODO: Truncante title after 2 lines
// TODO: Mobile
export function IssueCard({ issue }: TIssueCard.Props) {
  return (
    <Card key={issue.id} background="base">
      <Flex direction="col" className="gap-3">
        <Flex justifyContent="between" className="gap-6">
          <Typography variant="body-m-bold">{issue.title}</Typography>

          <BaseLink href={issue.htmlUrl}>
            <Button variant="secondary" size="xs">
              <Translate token="v2.pages.project.overview.goodFirstIssues.button" />
            </Button>
          </BaseLink>
        </Flex>

        <Flex alignItems="center" className="gap-3">
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
            typograhyVariant="body-xs"
            avatarSize="xs"
          />

          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-git-repository-line" className="text-spaceBlue-100" />

            <Link href={issue.repository.htmlUrl} className="text-spaceBlue-100">
              <Typography variant="body-xs">{issue.repository.name}</Typography>
            </Link>
          </Flex>
        </Flex>

        <Flex alignItems="center" className="gap-2">
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-price-tag-3-line" className="text-spaceBlue-100" />

            <Typography
              variant="body-xs"
              className="text-spaceBlue-100"
              translate={{ token: "v2.pages.project.overview.goodFirstIssues.labels.title" }}
            />
          </Flex>

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
      </Flex>
    </Card>
  );
}
