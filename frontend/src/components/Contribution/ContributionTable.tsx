import type { ApolloError } from "@apollo/client";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";

import { GetAllContributionsQuery, GithubUser } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import Loader from "src/components/Loader";
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
  GithubContributionIconStatus,
  GithubContributionIconStatusType,
  GithubContributionStatus,
  GithubContributionType,
} from "src/types";

function Message({ children }: PropsWithChildren) {
  return <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">{children}</p>;
}

function TableText({ children }: PropsWithChildren) {
  return (
    <tr>
      <td colSpan={4}>
        <div className="pt-6">
          <Message>{children}</Message>
        </div>
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

  function renderLinkedContributions(contribution: GetAllContributionsQuery["contributions"][number]) {
    switch (contribution.type) {
      case GithubContributionType.Issue: {
        const closedByPullRequests = contribution.githubIssue?.closedByPullRequests;

        if (closedByPullRequests?.length) {
          return contribution.githubIssue?.closedByPullRequests?.map(({ githubPullRequest }) => {
            const { id, number, status, title, author, htmlUrl, draft } = githubPullRequest ?? {};
            return (
              <ContributionBadge
                key={id}
                id={id}
                number={number}
                type={GithubContributionType.PullRequest}
                status={draft ? GithubContributionIconStatus.Draft : (status as GithubContributionIconStatusType)}
                title={title ?? ""}
                author={author as GithubUser}
                url={htmlUrl ?? ""}
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
            const { id, number, status, title, author, htmlUrl } = githubIssue ?? {};
            return (
              <ContributionBadge
                key={id}
                id={id}
                number={number}
                type={GithubContributionType.Issue}
                status={status as GithubContributionIconStatusType}
                title={title ?? ""}
                url={htmlUrl ?? ""}
                author={author as GithubUser}
              />
            );
          });
        }

        return "-";
      }
      case GithubContributionType.CodeReview: {
        const pr = contribution.githubCodeReview?.githubPullRequest;

        if (pr) {
          const { id, number, status, draft, author, title, htmlUrl } = pr;
          return (
            <ContributionBadge
              id={id}
              number={number}
              type={GithubContributionType.PullRequest}
              status={draft ? GithubContributionIconStatus.Draft : (status as GithubContributionIconStatusType)}
              title={title ?? ""}
              author={author as GithubUser}
              url={htmlUrl ?? ""}
            />
          );
        }

        return "-";
      }
      default:
        return "-";
    }
  }

  function renderMobileContent() {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="py-6">
          <Message>{T("contributions.table.error")}</Message>
        </div>
      );
    }

    if (data?.contributions?.length === 0) {
      return (
        <div className="py-6">
          <Message>
            {T("contributions.table.empty", {
              time: Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(data.githubRepos[0].indexedAt)),
            })}
          </Message>
        </div>
      );
    }

    return data?.contributions.map(contribution => {
      return <ContributionCard key={contribution.id} contribution={contribution} />;
    });
  }

  function renderDesktopContent() {
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
          <Cell height={CellHeight.Compact}>
            <ContributionDate
              id={contribution.id ?? ""}
              type={contribution.type as GithubContributionType}
              status={
                draft ? GithubContributionIconStatus.Draft : (contributionStatus as GithubContributionIconStatusType)
              }
              date={new Date(lineDate)}
            />
          </Cell>
          <Cell height={CellHeight.Compact}>
            <ContributionProjectRepo
              project={contribution.project as ComponentProps<typeof ContributionProjectRepo>["project"]}
              repo={contribution.githubRepo as ComponentProps<typeof ContributionProjectRepo>["repo"]}
            />
          </Cell>
          <Cell height={CellHeight.Compact}>
            <Contribution contribution={contribution} />
          </Cell>
          <Cell className="justify-end" height={CellHeight.Compact}>
            {renderLinkedContributions(contribution)}
          </Cell>
        </Line>
      );
    });
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-greyscale-50/8 bg-whiteFakeOpacity-5/95 shadow-2xl">
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
      <div className="flex flex-col gap-2 p-3 lg:hidden">{renderMobileContent()}</div>

      <div className="hidden px-4 py-6 lg:block">
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
          {renderDesktopContent()}
        </Table>
      </div>
    </section>
  );
}
