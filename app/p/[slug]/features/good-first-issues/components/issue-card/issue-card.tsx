import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Applicants } from "app/p/[slug]/features/good-first-issues/components/applicants/applicants";
import { OverviewAccordion } from "app/p/[slug]/features/good-first-issues/components/issue-card/components/overview-accordion/overview-accordion";

import { viewportConfig } from "src/config";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { Button } from "components/atoms/button/variants/button-default";
import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";
import { Contributor } from "components/features/contributor/contributor";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { ApplyButton } from "./components/apply-button/apply-button";
import { TIssueCard } from "./issue-card.types";

export function IssueCard({ issue, onDrawerOpen }: TIssueCard.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const { user } = useCurrentUser();

  const hasApplied = Boolean(user?.pendingApplications?.find(application => application.issue?.id === issue.id));

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const renderApplyButton = useMemo(() => {
    if (!isAuthenticated) {
      return (
        <Button
          as={BaseLink}
          htmlProps={{
            href: NEXT_ROUTER.signup.root,
          }}
        >
          <Translate token={"v2.pages.project.overview.goodFirstIssues.button.connectAndApply"} />
        </Button>
      );
    }

    return <ApplyButton hasApplied={hasApplied} onDrawerOpen={onDrawerOpen} />;
  }, [isAuthenticated, hasApplied, onDrawerOpen]);

  return (
    <Card key={issue.id} background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4 p-5 md:gap-3">
        <Flex justifyContent="between" className="gap-6">
          <Typography variant="body-m-bold" className="line-clamp-2">
            {issue.title}
          </Typography>

          {isMd ? renderApplyButton : null}
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

            <Link href={issue.repo.htmlUrl} className="text-spaceBlue-100">
              <Typography variant="body-xs">{issue.repo.name}</Typography>
            </Link>
          </Flex>
        </Flex>

        <Applicants applicants={issue.applicants} />

        <Flex wrap="wrap" className="gap-2">
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
                  <Typography variant="body-xs" className="whitespace-nowrap first-letter:capitalize">
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

        {!isMd ? renderApplyButton : null}

        <OverviewAccordion body={issue.body} />
      </Flex>
    </Card>
  );
}
