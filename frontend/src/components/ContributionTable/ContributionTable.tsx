import type { ApolloError } from "@apollo/client";
import { PropsWithChildren, ReactNode } from "react";
import { Link, generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";
import { GetAllContributionsQuery } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution, ContributionType } from "src/components/Contribution/Contribution";
import { ContributionBadge } from "src/components/ContributionBadge/ContributionBadge";
import { ContributionDateTooltip } from "src/components/ContributionDateTooltip/ContributionDateTooltip";
import {
  ContributionIconStatus,
  ContributionIconStatusType,
  ContributionIconType,
} from "src/components/ContributionIcon/ContributionIcon";
import { ContributionReviewStatus } from "src/components/ContributionReview/ContributionReview";
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
import { ContributionTableStatus } from "src/pages/Contributions/Contributions";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
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
  status: ContributionTableStatus;
}) {
  const { T } = useIntl();

  function renderContribution(contribution: GetAllContributionsQuery["contributions"][number]) {
    switch (contribution.type) {
      case ContributionType.Issue:
        return (
          <Contribution
            name={contribution.githubIssue?.title ?? ""}
            url={contribution.githubIssue?.htmlUrl ?? ""}
            number={contribution.githubIssue?.number ?? ""}
            type={ContributionType.Issue}
            status={(contribution.githubIssue?.status as ContributionIconStatusType) ?? ""}
            //   external={contribution.external}}
            rewards={contribution?.rewardItemsAggregate.aggregate?.count ?? 0}
          />
        );
      case ContributionType.PullRequest: {
        let review: ContributionReviewStatus;
        const codeReviews = contribution?.githubPullRequest?.codeReviews;

        if (codeReviews?.length) {
          switch (codeReviews[0].outcome) {
            case null:
              review = ContributionReviewStatus.UnderReview;
              break;
            case "changes_requested":
              review = ContributionReviewStatus.ChangesRequested;
              break;
            case "approved":
              review = ContributionReviewStatus.Approved;
              break;
            default:
              review = ContributionReviewStatus.PendingReviewer;
              break;
          }
        } else {
          review = ContributionReviewStatus.PendingReviewer;
        }

        return (
          <Contribution
            name={contribution.githubPullRequest?.title ?? ""}
            url={contribution.githubPullRequest?.htmlUrl ?? ""}
            number={contribution.githubPullRequest?.number ?? ""}
            type={ContributionType.PullRequest}
            status={(contribution.githubPullRequest?.status as ContributionIconStatusType) ?? ""}
            draft={contribution.githubPullRequest?.draft}
            // external={contribution.external}
            rewards={contribution?.rewardItemsAggregate.aggregate?.count ?? 0}
            review={review}
          />
        );
      }
      case ContributionType.CodeReview:
        return (
          <Contribution
            name={contribution.githubCodeReview?.githubPullRequest?.title ?? ""}
            url={contribution.githubCodeReview?.githubPullRequest?.htmlUrl ?? ""}
            number={contribution.githubCodeReview?.githubPullRequest?.number ?? ""}
            type={ContributionType.CodeReview}
            status={(contribution.githubCodeReview?.githubPullRequest?.status as ContributionIconStatusType) ?? ""}
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
      case ContributionType.Issue: {
        const closedByPullRequests = contribution.githubIssue?.closedByPullRequests;

        if (closedByPullRequests?.length) {
          return contribution.githubIssue?.closedByPullRequests?.map(({ githubPullRequest }) => {
            const { id, number, status, draft } = githubPullRequest ?? {};
            return (
              <ContributionBadge
                key={id}
                number={number}
                type={ContributionType.PullRequest}
                status={status as ContributionIconStatusType}
                draft={draft}
              />
            );
          });
        }

        return "-";
      }
      case ContributionType.PullRequest: {
        const closingIssues = contribution.githubPullRequest?.closingIssues;

        if (closingIssues?.length) {
          return closingIssues.map(({ githubIssue }) => {
            const { id, number, status } = githubIssue ?? {};
            return (
              <ContributionBadge
                key={id}
                number={number}
                type={ContributionType.Issue}
                status={status as ContributionIconStatusType}
              />
            );
          });
        }

        return "-";
      }
      case ContributionType.CodeReview: {
        const pr = contribution.githubCodeReview?.githubPullRequest;

        if (pr) {
          const { number, status, draft } = pr;
          return (
            <ContributionBadge
              number={number}
              type={ContributionType.PullRequest}
              status={status as ContributionIconStatusType}
              draft={draft}
            />
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
      const lineDate = status === ContributionTableStatus.InProgress ? contribution.createdAt : contribution.closedAt;

      const { status: contributionStatus } = contribution.githubPullRequest ??
        contribution.githubIssue ??
        contribution.githubCodeReview ?? { status: ContributionIconStatus.Open };
      const { draft } = contribution?.githubPullRequest ?? {};

      return (
        <Line key={contribution.id}>
          <Cell height={CellHeight.Medium}>
            <ContributionDateTooltip
              id={`${contribution.id}-date-tooltip`}
              type={contribution.type as ContributionIconType}
              status={draft ? ContributionIconStatus.Draft : (contributionStatus as ContributionIconStatusType)}
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
