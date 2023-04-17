import http from "k6/http";
import { check } from "k6";

const GRAPHQL_URL = "https://staging.gateway.onlydust.xyz/api/v1/graphql";

function checkGraphQLResponse(res) {
  check(res, {
    "no error in response": r => {
      return r.status == 200 && r.json().errors === undefined;
    },
  });
}

export function getProjects(headers) {
  const res = http.post(
    GRAPHQL_URL,
    JSON.stringify(
      {
        operationName: "GetProjects",
        variables: {},
        query:
          "fragment ProjectLead on users {\n  id\n  displayName\n  avatarUrl\n  __typename\n}\n\nfragment Sponsor on Sponsors {\n  id\n  name\n  logoUrl\n  url\n  __typename\n}\n\nfragment ProjectContributors on Projects {\n  githubRepos {\n    githubRepoId\n    githubRepoDetails {\n      id\n      content {\n        id\n        contributors {\n          ...ContributorId\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  budgets {\n    id\n    paymentRequests {\n      id\n      githubRecipient {\n        ...ContributorId\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ContributorId on User {\n  id\n  __typename\n}\n\nfragment ProjectCardGithubRepoFields on ProjectGithubRepos {\n  githubRepoId\n  githubRepoDetails {\n    id\n    languages\n    __typename\n  }\n  __typename\n}\n\nfragment ProjectCardFields on Projects {\n  id\n  ...ProjectContributors\n  budgetsAggregate {\n    aggregate {\n      sum {\n        spentAmount\n        initialAmount\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  budgets {\n    id\n    __typename\n  }\n  projectDetails {\n    projectId\n    name\n    telegramLink\n    logoUrl\n    shortDescription\n    __typename\n  }\n  pendingInvitations {\n    id\n    githubUserId\n    __typename\n  }\n  projectLeads {\n    userId\n    user {\n      ...ProjectLead\n      __typename\n    }\n    __typename\n  }\n  githubRepos {\n    ...ProjectCardGithubRepoFields\n    __typename\n  }\n  projectSponsors {\n    sponsor {\n      ...Sponsor\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery GetProjects($languages: [String!], $sponsors: [String!]) {\n  projects(orderBy: {budgetsAggregate: {sum: {spentAmount: DESC}}}) {\n    ...ProjectCardFields\n    __typename\n  }\n}",
      },
      { headers, tags: { operationName: "GetProjects" } }
    )
  );
  checkGraphQLResponse(res);
}

export function getFilterOptions(headers) {
  const res = http.post(
    GRAPHQL_URL,
    JSON.stringify(
      {
        operationName: "GetAllFilterOptions",
        variables: {},
        query:
          "fragment VisibleProject on Projects {\n  id\n  projectLeads {\n    userId\n    __typename\n  }\n  githubRepos {\n    githubRepoId\n    __typename\n  }\n  budgets {\n    id\n    __typename\n  }\n  pendingInvitations {\n    id\n    githubUserId\n    __typename\n  }\n  __typename\n}\n\nfragment GithubRepoLanguagesFields on ProjectGithubRepos {\n  githubRepoId\n  githubRepoDetails {\n    id\n    languages\n    __typename\n  }\n  __typename\n}\n\nquery GetAllFilterOptions {\n  projects {\n    ...VisibleProject\n    projectSponsors {\n      sponsor {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    githubRepos {\n      ...GithubRepoLanguagesFields\n      __typename\n    }\n    __typename\n  }\n}",
      },
      { headers, tags: { operationName: "GetAllFilterOptions" } }
    )
  );
  checkGraphQLResponse(res);
}

export function getProject(projectId, headers) {
  const res = http.post(
    GRAPHQL_URL,
    JSON.stringify(
      {
        operationName: "GetProject",
        variables: {
          id: projectId,
        },
        query:
          "fragment ProjectLead on users {\n  id\n  displayName\n  avatarUrl\n  __typename\n}\n\nfragment Sponsor on Sponsors {\n  id\n  name\n  logoUrl\n  url\n  __typename\n}\n\nfragment ProjectContributors on Projects {\n  githubRepos {\n    githubRepoId\n    githubRepoDetails {\n      id\n      content {\n        id\n        contributors {\n          ...ContributorId\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  budgets {\n    id\n    paymentRequests {\n      id\n      githubRecipient {\n        ...ContributorId\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ContributorId on User {\n  id\n  __typename\n}\n\nfragment ProjectCardGithubRepoFields on ProjectGithubRepos {\n  githubRepoId\n  githubRepoDetails {\n    id\n    languages\n    __typename\n  }\n  __typename\n}\n\nfragment ProjectCardFields on Projects {\n  id\n  ...ProjectContributors\n  budgetsAggregate {\n    aggregate {\n      sum {\n        spentAmount\n        initialAmount\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  budgets {\n    id\n    __typename\n  }\n  projectDetails {\n    projectId\n    name\n    telegramLink\n    logoUrl\n    shortDescription\n    __typename\n  }\n  pendingInvitations {\n    id\n    githubUserId\n    __typename\n  }\n  projectLeads {\n    userId\n    user {\n      ...ProjectLead\n      __typename\n    }\n    __typename\n  }\n  githubRepos {\n    ...ProjectCardGithubRepoFields\n    __typename\n  }\n  projectSponsors {\n    sponsor {\n      ...Sponsor\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery GetProject($id: uuid!) {\n  projectsByPk(id: $id) {\n    ...ProjectCardFields\n    __typename\n  }\n}",
      },
      { headers, tags: { operationName: "GetProject" } }
    )
  );
  checkGraphQLResponse(res);
}

export function getContributors(projectId, headers) {
  const res = http.post(
    GRAPHQL_URL,
    JSON.stringify(
      {
        operationName: "GetProjectContributors",
        variables: {
          projectId,
        },
        query:
          "fragment ContributorsTableFields on User {\n  id\n  login\n  avatarUrl\n  htmlUrl\n  user {\n    userId\n    __typename\n  }\n  paymentRequests {\n    id\n    budget {\n      id\n      projectId\n      __typename\n    }\n    amountInUsd\n    workItems {\n      repoId\n      issueNumber\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GithubRepoContributorsFields on ProjectGithubRepos {\n  githubRepoId\n  githubRepoDetails {\n    id\n    content {\n      id\n      contributors {\n        ...ContributorsTableFields\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery GetProjectContributors($projectId: uuid!) {\n  projectsByPk(id: $projectId) {\n    id\n    projectDetails {\n      projectId\n      name\n      __typename\n    }\n    githubRepos {\n      ...GithubRepoContributorsFields\n      __typename\n    }\n    budgets {\n      id\n      paymentRequests {\n        id\n        githubRecipient {\n          ...ContributorsTableFields\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
      },
      { headers, tags: { operationName: "GetProjectContributors" } }
    )
  );
  checkGraphQLResponse(res);
}
