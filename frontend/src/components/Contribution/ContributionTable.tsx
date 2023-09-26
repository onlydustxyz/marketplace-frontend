import type { ApolloError } from "@apollo/client";
import { PropsWithChildren, ReactNode } from "react";
import { Link, generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";
import { GetAllContributionsQuery, GithubUser } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionBadgeTooltip } from "src/components/Contribution/ContributionBadgeTooltip";
import { ContributionDateTooltip } from "src/components/Contribution/ContributionDateTooltip";
import Loader from "src/components/Loader";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Table from "src/components/Table";
import Cell, { CellHeight } from "src/components/Table/Cell";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import Line from "src/components/Table/Line";
import { useIntl } from "src/hooks/useIntl";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import {
  GithubCodeReviewOutcome,
  GithubContributionIconStatus,
  GithubContributionIconStatusType,
  GithubContributionReviewStatus,
  GithubContributionStatus,
  GithubContributionType,
} from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";

function TableText({ children }: PropsWithChildren) {
  return (
    <tr>
      <td colSpan={4}>
        <p className="whitespace-pre-line pt-6 text-center font-walsheim text-sm text-greyscale-50">{children}</p>
      </td>
    </tr>
  );
}

export default function ContributionTable({
  id,
  title,
  description,
  icon,
  onHeaderClick,
  data,
  loading,
  error,
  showHeader = true,
  status,
}: {
  id: string;
  title: string;
  description: string;
  icon(className: string): ReactNode;
  onHeaderClick: () => void;
  data?: GetAllContributionsQuery;
  loading: boolean;
  error?: ApolloError;
  showHeader?: boolean;
  status: GithubContributionStatus;
}) {
  const { T } = useIntl();

  function renderContribution(contribution: GetAllContributionsQuery["contributions"][number]) {
    switch (contribution.type) {
      case GithubContributionType.Issue:
        return (
          <Contribution
            id={contribution.githubIssue?.id ?? ""}
            title={contribution.githubIssue?.title ?? ""}
            url={contribution.githubIssue?.htmlUrl ?? ""}
            number={contribution.githubIssue?.number ?? ""}
            type={GithubContributionType.Issue}
            status={(contribution.githubIssue?.status as GithubContributionIconStatusType) ?? ""}
            //   external={contribution.external}}
            rewards={contribution?.rewardItemsAggregate.aggregate?.count ?? 0}
          />
        );
      case GithubContributionType.PullRequest: {
        let review: GithubContributionReviewStatus;
        const codeReviews = contribution?.githubPullRequest?.codeReviews;

        if (codeReviews?.length) {
          switch (codeReviews[0].outcome) {
            case null:
              review = GithubContributionReviewStatus.UnderReview;
              break;
            case GithubCodeReviewOutcome.ChangesRequested:
              review = GithubContributionReviewStatus.ChangesRequested;
              break;
            case GithubCodeReviewOutcome.Approved:
              review = GithubContributionReviewStatus.Approved;
              break;
            default:
              review = GithubContributionReviewStatus.PendingReviewer;
              break;
          }
        } else {
          review = GithubContributionReviewStatus.PendingReviewer;
        }

        return (
          <Contribution
            id={contribution.githubPullRequest?.id}
            title={contribution.githubPullRequest?.title ?? ""}
            url={contribution.githubPullRequest?.htmlUrl ?? ""}
            number={contribution.githubPullRequest?.number ?? ""}
            type={GithubContributionType.PullRequest}
            status={(contribution.githubPullRequest?.status as GithubContributionIconStatusType) ?? ""}
            draft={contribution.githubPullRequest?.draft}
            // external={contribution.external}
            rewards={contribution?.rewardItemsAggregate.aggregate?.count ?? 0}
            review={review}
          />
        );
      }
      case GithubContributionType.CodeReview:
        return (
          <Contribution
            id={contribution.githubCodeReview?.githubPullRequest?.id}
            title={contribution.githubCodeReview?.githubPullRequest?.title ?? ""}
            url={contribution.githubCodeReview?.githubPullRequest?.htmlUrl ?? ""}
            number={contribution.githubCodeReview?.githubPullRequest?.number ?? ""}
            type={GithubContributionType.CodeReview}
            status={
              (contribution.githubCodeReview?.githubPullRequest?.status as GithubContributionIconStatusType) ?? ""
            }
            // external={contribution.external}
            rewards={contribution?.rewardItemsAggregate.aggregate?.count ?? 0}
          />
        );
      default:
        return null;
    }
  }

  function renderLinkedContributions(contribution: GetAllContributionsQuery["contributions"][number]) {
    switch (contribution.type) {
      case GithubContributionType.Issue: {
        const closedByPullRequests = contribution.githubIssue?.closedByPullRequests;

        if (closedByPullRequests?.length) {
          return contribution.githubIssue?.closedByPullRequests?.map(({ githubPullRequest }) => {
            const { id, number, status, draft } = githubPullRequest ?? {};
            return (
              <ContributionBadge
                key={id}
                number={number}
                type={GithubContributionType.PullRequest}
                status={status as GithubContributionIconStatusType}
                draft={draft}
              />
            );
          });
        }

        return "-";
      }
      case GithubContributionType.PullRequest: {
        const closingIssues = contribution.githubPullRequest?.closingIssues;

        if (closingIssues?.length) {
          return closingIssues.map(({ githubIssue }) => {
            const { id, number, status } = githubIssue ?? {};
            return (
              <ContributionBadge
                key={id}
                number={number}
                type={GithubContributionType.Issue}
                status={status as GithubContributionIconStatusType}
              />
            );
          });
        }

        return "-";
      }
      case GithubContributionType.CodeReview: {
        const pr = contribution.githubCodeReview?.githubPullRequest;

        if (pr) {
          const { number, status, draft, author, title } = pr;
          return (
            <>
              <ContributionBadgeTooltip
                id={`${id}-linked-pr-badge-tooltip`}
                type={GithubContributionType.PullRequest}
                status={status as GithubContributionIconStatusType}
                number={number}
                title={title ?? ""}
                author={author as GithubUser}
              />

              <div id={`${id}-linked-pr-badge-tooltip`}>
                <ContributionBadge
                  number={number}
                  type={GithubContributionType.PullRequest}
                  status={status as GithubContributionIconStatusType}
                  draft={draft}
                />
              </div>
            </>
          );
        }

        return "-";
      }
      default:
        return "-";
    }
  }

  function renderContent() {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="pt-6">
            <div className="md:py-24">
              <Loader />
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return <TableText>{T("contributions.table.error")}</TableText>;
    }

    if (data?.contributions?.length === 0) {
      return (
        <TableText>
          {T("contributions.table.empty", {
            time: Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(data.githubRepos[0].indexedAt)),
          })}
        </TableText>
      );
    }

    return data?.contributions.map(contribution => {
      const lineDate = status === GithubContributionStatus.InProgress ? contribution.createdAt : contribution.closedAt;

      const { status: contributionStatus } = contribution.githubPullRequest ??
        contribution.githubIssue ??
        contribution.githubCodeReview ?? { status: GithubContributionIconStatus.Open };
      const { draft } = contribution?.githubPullRequest ?? {};

      return (
        <Line key={contribution.id}>
          <Cell height={CellHeight.Medium}>
            <ContributionDateTooltip
              id={`${contribution.id}-date-tooltip`}
              type={contribution.type as GithubContributionType}
              status={
                draft ? GithubContributionIconStatus.Draft : (contributionStatus as GithubContributionIconStatusType)
              }
              date={new Date(lineDate)}
            />
            <span id={`${contribution.id}-date-tooltip`} className="text-sm first-letter:uppercase">
              {displayRelativeDate(lineDate)}
            </span>
          </Cell>
          <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
            <div className="flex items-center gap-3">
              {contribution.project?.logoUrl ? (
                <RoundedImage
                  src={contribution.project?.logoUrl ?? ""}
                  alt={contribution.project?.name ?? ""}
                  rounding={Rounding.Corners}
                  size={ImageSize.Sm}
                />
              ) : null}
              <p className="text-sm">
                <Link
                  to={generatePath(RoutePaths.ProjectDetails, {
                    projectKey: contribution.project?.key ?? "",
                  })}
                  className="hover:underline"
                >
                  {contribution.project?.name}
                </Link>
                <span className="text-spaceBlue-300">/</span>{" "}
                <a
                  href={contribution.githubRepo?.htmlUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {contribution.githubRepo?.name}
                </a>
              </p>
            </div>
          </Cell>
          <Cell height={CellHeight.Medium}>{renderContribution(contribution)}</Cell>
          <Cell className="justify-end" height={CellHeight.Medium}>
            {renderLinkedContributions(contribution)}
          </Cell>
        </Line>
      );
    });
  }

  return (
    <section className="rounded-2xl border border-white/5">
      {showHeader ? (
        <header
          className="flex cursor-pointer items-start gap-3 border-b border-greyscale-50/8 bg-white/2 px-6 py-4"
          onClick={onHeaderClick}
        >
          <div className="rounded-lg bg-white/5 p-3 text-greyscale-50">{icon("h-5 w-5")}</div>
          <div className="font-walsheim">
            <p className="text-base font-medium text-greyscale-50">{title}</p>
            <p className="text-sm text-spaceBlue-200">{description}</p>
          </div>
        </header>
      ) : null}
      <div className="px-4 py-6">
        <Table
          id={id}
          headers={
            <HeaderLine>
              <HeaderCell
                horizontalMargin
                // onClick={() => applySorting(Field.Date, false)}
              >
                <TimeLine />
                <span>{T("contributions.table.date")}</span>
                <SortingArrow
                  direction="up"
                  visible={true}
                  // direction={sorting.ascending ? "up" : "down"}
                  // visible={sorting.field === Field.Date}
                />
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Quarter}
                horizontalMargin
                // onClick={() => applySorting(Field.RewardId, true)}
              >
                <Folder3Line />
                <span>{T("contributions.table.projectRepo")}</span>
                {/* <SortingArrow
                  direction={sorting.ascending ? "up" : "down"}
                  visible={sorting.field === Field.RewardId}
                /> */}
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Half}
                // onClick={() => applySorting(Field.Amount, false)}
                horizontalMargin
              >
                <StackLine />
                <span>{T("contributions.table.contribution")}</span>
                {/* <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Amount} /> */}
              </HeaderCell>
              <HeaderCell
                // onClick={() => applySorting(Field.Status, true)}
                horizontalMargin
                className="justify-end"
              >
                <span>
                  <IssueOpen className="h-3 w-3" />
                </span>
                <span>{T("contributions.table.linkedTo")}</span>
                {/* <SortingArrow direction={sorting.ascending ? "up" : "down"} visible={sorting.field === Field.Status} /> */}
              </HeaderCell>
            </HeaderLine>
          }
        >
          {renderContent()}
        </Table>
      </div>
    </section>
  );
}
