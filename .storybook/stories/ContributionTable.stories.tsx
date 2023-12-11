import { ComponentProps } from "react";
import { OrderBy } from "src/__generated/graphql";
import MeApi from "src/api/me";
import IssueOpen from "src/assets/icons/IssueOpen";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { ContributionTable, TableColumns } from "src/components/Contribution/ContributionTable";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, Contribution as ContributionT, GithubContributionType } from "src/types";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import { contribution } from ".storybook/mocks/contribution";
import ProjectApi from "src/api/Project";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

// @ts-expect-error
const query: ReturnType<
  typeof MeApi.queries.useMyContributions | typeof ProjectApi.queries.useProjectContributionsInfiniteList
> = {
  status: "success",
  fetchStatus: "fetching",
  isPending: false,
  isSuccess: true,
  isError: false,
  isInitialLoading: false,
  isLoading: false,
  data: {
    pages: [
      {
        contributions: [
          {
            type: "PULL_REQUEST",
            repo: {
              id: 498695724,
              owner: "onlydustxyz",
              name: "marketplace-frontend",
              description: "",
              htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
            },
            githubAuthor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            },
            githubNumber: 1503,
            githubStatus: "OPEN",
            githubTitle: "B 1178 build new contributions tab",
            githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1503",
            githubBody: "",
            githubCodeReviewOutcome: "COMMENTED",
            id: "440ada773bbb1c112e039324edac9bd2e2dd612d2c7b99d9cc73aaa4ad483c11",
            createdAt: "2023-11-30T16:32:31Z",
            status: "IN_PROGRESS",
            githubPullRequestReviewState: "APPROVED",
            rewardIds: [],
            project: {
              id: "79c544b6-4957-42b7-92ae-12dcfda575d8",
              slug: "deluge",
              name: "Deluge",
              shortDescription: "Deluge is a load testing tool test",
              logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6654894962983457094.png",
              visibility: "PUBLIC",
            },
            contributor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
              isRegistered: true,
            },
            links: [],
          },
          {
            type: "CODE_REVIEW",
            repo: {
              id: 498695724,
              owner: "onlydustxyz",
              name: "marketplace-frontend",
              description: "",
              htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
            },
            githubAuthor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            },
            githubNumber: 1503,
            githubStatus: "COMMENTED",
            githubTitle: "B 1178 build new contributions tab",
            githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1503",
            githubBody: "",
            githubCodeReviewOutcome: "COMMENTED",
            id: "e206b183dcd8da4448ac21169ac9b4ec060c54273c98c80ceb3c3287c0173312",
            createdAt: "2023-11-30T16:32:31Z",
            status: "IN_PROGRESS",
            githubPullRequestReviewState: "PENDING_REVIEWER",
            rewardIds: [],
            project: {
              id: "79c544b6-4957-42b7-92ae-12dcfda575d8",
              slug: "deluge",
              name: "Deluge",
              shortDescription: "Deluge is a load testing tool test",
              logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/6654894962983457094.png",
              visibility: "PUBLIC",
            },
            contributor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
              isRegistered: true,
            },
            links: [
              {
                type: "PULL_REQUEST",
                repo: {
                  id: 498695724,
                  owner: "onlydustxyz",
                  name: "marketplace-frontend",
                  description: "",
                  htmlUrl: "https://github.com/onlydustxyz/marketplace-frontend",
                },
                githubAuthor: {
                  githubUserId: 5160414,
                  login: "haydencleary",
                  htmlUrl: "https://github.com/haydencleary",
                  avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
                },
                githubNumber: 1503,
                githubStatus: "OPEN",
                githubTitle: "B 1178 build new contributions tab",
                githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1503",
                githubBody: "",
                githubCodeReviewOutcome: "COMMENTED",
                is_mine: true,
              },
            ],
          },
          {
            type: "ISSUE",
            repo: {
              id: 663102799,
              owner: "onlydustxyz",
              name: "od-rust-template",
              description: "",
              htmlUrl: "https://github.com/onlydustxyz/od-rust-template",
            },
            githubAuthor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            },
            githubNumber: 51,
            githubStatus: "OPEN",
            githubTitle: "Test",
            githubHtmlUrl: "https://github.com/onlydustxyz/od-rust-template/issues/51",
            githubBody: "",
            githubCodeReviewOutcome: "COMMENTED",
            id: "e7d16abaf8d400588d3eeaa099115331cdaf31dbeed61234f2e903e1538f31c0",
            createdAt: "2023-10-24T19:33:38Z",
            status: "IN_PROGRESS",
            githubPullRequestReviewState: "PENDING_REVIEWER",
            rewardIds: [],
            project: {
              id: "808442f1-e7f1-4ec8-87a1-fb68a25162a9",
              slug: "bug-fix-mickael",
              name: "Bug fix Mickael",
              shortDescription: "Lorem Ipsumdd Hello",
              logoUrl:
                "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/1a91a89934ce4b6e7bc7a859552d30a3.png",
              visibility: "PUBLIC",
            },
            contributor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
              isRegistered: true,
            },
            links: [],
          },
          {
            type: "ISSUE",
            repo: {
              id: 663102799,
              owner: "onlydustxyz",
              name: "od-rust-template",
              description: "",
              htmlUrl: "https://github.com/onlydustxyz/od-rust-template",
            },
            githubAuthor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            },
            githubNumber: 51,
            githubStatus: "OPEN",
            githubTitle: "Test",
            githubHtmlUrl: "https://github.com/onlydustxyz/od-rust-template/issues/51",
            githubBody: "",
            githubCodeReviewOutcome: "COMMENTED",
            id: "e7d16abaf8d400588d3eeaa099115331cdaf31dbeed61234f2e903e1538f31c0",
            createdAt: "2023-10-24T19:33:38Z",
            status: "IN_PROGRESS",
            githubPullRequestReviewState: "PENDING_REVIEWER",
            rewardIds: [],
            project: {
              id: "76516cbc-8815-4b2f-932f-9223710ebcbe",
              slug: "mtest",
              name: "MTest",
              shortDescription: "Test",
              logoUrl: "",
              visibility: "PUBLIC",
            },
            contributor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
              isRegistered: true,
            },
            links: [],
          },
          {
            type: "ISSUE",
            repo: {
              id: 663102799,
              owner: "onlydustxyz",
              name: "od-rust-template",
              description: "",
              htmlUrl: "https://github.com/onlydustxyz/od-rust-template",
            },
            githubAuthor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            },
            githubNumber: 51,
            githubStatus: "OPEN",
            githubTitle: "Test",
            githubHtmlUrl: "https://github.com/onlydustxyz/od-rust-template/issues/51",
            githubBody: "",
            githubCodeReviewOutcome: "COMMENTED",
            id: "e7d16abaf8d400588d3eeaa099115331cdaf31dbeed61234f2e903e1538f31c0",
            createdAt: "2023-10-24T19:33:38Z",
            status: "IN_PROGRESS",
            githubPullRequestReviewState: "PENDING_REVIEWER",
            rewardIds: [],
            project: {
              id: "80b974f4-aaa5-45c4-9464-b05bd18fff56",
              slug: "test-alexis-new223565",
              name: "test alexis new223565",
              shortDescription: "test alexis short1",
              logoUrl: "",
              visibility: "PUBLIC",
            },
            contributor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
              isRegistered: true,
            },
            links: [],
          },
          {
            type: "ISSUE",
            repo: {
              id: 663102799,
              owner: "onlydustxyz",
              name: "od-rust-template",
              description: "",
              htmlUrl: "https://github.com/onlydustxyz/od-rust-template",
            },
            githubAuthor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
            },
            githubNumber: 51,
            githubStatus: "OPEN",
            githubTitle: "Test",
            githubHtmlUrl: "https://github.com/onlydustxyz/od-rust-template/issues/51",
            githubBody: "",
            githubCodeReviewOutcome: "COMMENTED",
            id: "e7d16abaf8d400588d3eeaa099115331cdaf31dbeed61234f2e903e1538f31c0",
            createdAt: "2023-10-24T19:33:38Z",
            status: "IN_PROGRESS",
            githubPullRequestReviewState: "PENDING_REVIEWER",
            rewardIds: [],
            project: {
              id: "c2c4b6b8-f09a-4863-86c0-f31cc8e7e9ed",
              slug: "qa-pierre-alexis",
              name: "QA Pierre Alexis",
              shortDescription: "QA Pierre & Alexis",
              logoUrl: "",
              visibility: "PUBLIC",
            },
            contributor: {
              githubUserId: 5160414,
              login: "haydencleary",
              htmlUrl: "https://github.com/haydencleary",
              avatarUrl: "https://avatars.githubusercontent.com/u/5160414?v=4",
              isRegistered: true,
            },
            links: [],
          },
        ],
        hasMore: false,
        totalPageNumber: 1,
        totalItemNumber: 6,
        nextPageIndex: 0,
      },
    ],
    pageParams: [0],
  },
  dataUpdatedAt: 1702308994115,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: true,
  isFetchedAfterMount: false,
  isFetching: true,
  isRefetching: true,
  isLoadingError: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isStale: true,
  hasNextPage: false,
  hasPreviousPage: false,
  isFetchingNextPage: false,
  isFetchingPreviousPage: false,
};

export default {
  title: "ContributionTable",
  component: ContributionTable,
  decorators: [
    withRouter(),
    withAuthProvider({ userId: USER_ID }),
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    withQueryClientProvider,
  ],
};

const defaultProps: ComponentProps<typeof ContributionTable> = {
  id: "in_progress_contributions_table",
  title: "In progress",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum aliquam. Placeat, quisquam neque quaerat mollitia magnam asperiores quam porro dignissimos, laboriosam minima nulla consequuntur omnis. Officia deserunt dicta excepturi!",
  icon: className => <ProgressCircle className={className} />,
  sort: {
    sort: TableColumns.Date,
    direction: OrderBy.Desc,
  },
  onSort: sort => {
    alert("Sorting");
  },
  headerCells: [
    {
      sort: TableColumns.Date,
      icon: <TimeLine />,
      label: "Date",
    },
    {
      sort: TableColumns.Project,
      icon: <Folder3Line />,
      label: "Project/Repo",
      width: HeaderCellWidth.Quarter,
    },
    {
      sort: TableColumns.Contribution,
      icon: <StackLine />,
      label: "Contribution",
      width: HeaderCellWidth.Half,
    },
    {
      sort: TableColumns.Linked,
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: "Linked to",
      className: "justify-end",
    },
  ],
  bodyRow: (contribution?: ContributionT) => {
    if (!contribution) return null;

    const { createdAt, completedAt, githubStatus, id, repo, status, type } = contribution;
    const lineId = `${id}-${contribution.project.id}`;
    const lineDate = (status === ContributionStatus.InProgress ? createdAt : completedAt) ?? 0;

    return (
      <Line key={lineId} className="border-card-border-light">
        <Cell height={CellHeight.Compact}>
          <ContributionDate
            id={lineId}
            type={type as GithubContributionType}
            status={githubStatus}
            contributionStatus={status}
            date={new Date(lineDate)}
            tooltipProps={{ variant: TooltipVariant.Default, position: TooltipPosition.Bottom }}
          />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <ContributionProjectRepo project={contribution.project} repo={repo} />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contribution contribution={contribution} />
        </Cell>
        <Cell className="justify-end gap-1" height={CellHeight.Compact}>
          {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
        </Cell>
      </Line>
    );
  },
  query,
};

export const Default = {
  render: (args: typeof ContributionTable) => <ContributionTable {...defaultProps} {...args} />,
};
