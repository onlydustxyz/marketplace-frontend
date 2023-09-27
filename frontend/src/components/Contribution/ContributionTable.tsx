import type { ApolloError } from "@apollo/client";
import classNames from "classnames";
import { ComponentProps, PropsWithChildren, ReactNode, useState } from "react";

import atomLogo from "assets/img/atom.png";
import { GetAllContributionsQuery } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import Table from "src/components/Table";
import Cell, { CellHeight } from "src/components/Table/Cell";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import Line from "src/components/Table/Line";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
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
import { useMediaQuery } from "usehooks-ts";

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

function Loader() {
  const { T } = useIntl();

  return (
    <div className="flex justify-center py-24">
      <img src={atomLogo} alt={T("state.loading")} className="animate-spin-medium" />
    </div>
  );
}

export default function ContributionTable({
  data,
  description,
  error,
  icon,
  id,
  loading,
  onHeaderClick,
  fullTable = true,
  status,
  title,
}: {
  data?: GetAllContributionsQuery;
  description: string;
  error?: ApolloError;
  icon(className: string): ReactNode;
  id: string;
  loading: boolean;
  onHeaderClick: () => void;
  fullTable?: boolean;
  status: GithubContributionStatus;
  title: string;
}) {
  const { T } = useIntl();
  const [showAll, setShowAll] = useState(false);

  // Used for performance optimization, avoid rendering large invisible DOM
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

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

    const nbContributions = data?.contributions?.length ?? 0;
    const maxContributions = 2;
    const showAllContributions = nbContributions > maxContributions;
    const contributions = showAll ? data?.contributions : data?.contributions?.slice(0, maxContributions);

    return (
      <div className="flex flex-col gap-2">
        {contributions?.map(contribution => {
          return (
            <div
              key={contribution.id}
              className={classNames("rounded-xl", {
                "bg-whiteFakeOpacity-5/95 lg:bg-none": !fullTable,
              })}
            >
              <ContributionCard contribution={contribution} status={status} />
            </div>
          );
        })}

        {showAllContributions && !showAll ? (
          <div className="px-3 py-3.5">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-greyscale-50 bg-white/5 px-4 py-3.5 font-walsheim font-medium leading-none text-greyscale-50 shadow-lg"
              onClick={() => setShowAll(true)}
            >
              <ArrowDownSLine className="flex h-4 items-center justify-center text-xl" />
              {T("contributions.table.showAll", { count: nbContributions })}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  function renderDesktopContent() {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="pt-6">
            <Loader />
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
          <Cell className="justify-end gap-1" height={CellHeight.Compact}>
            {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
          </Cell>
        </Line>
      );
    });
  }

  return (
    <section
      className={classNames("overflow-hidden rounded-2xl border-greyscale-50/8", {
        "border bg-whiteFakeOpacity-5/95 shadow-2xl": fullTable,
        "lg:border lg:bg-whiteFakeOpacity-5/95 lg:shadow-2xl": !fullTable,
      })}
    >
      {fullTable ? (
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
      <div className="p-3 lg:hidden">{!isLg ? renderMobileContent() : null}</div>

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
          {isLg ? renderDesktopContent() : null}
        </Table>
      </div>
    </section>
  );
}
