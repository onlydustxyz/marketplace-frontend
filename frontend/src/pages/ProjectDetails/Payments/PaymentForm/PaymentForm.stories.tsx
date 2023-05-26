import {
  GetProjectContributorsForPaymentSelectDocument,
  GetProjectContributorsForPaymentSelectQueryResult,
  GithubUserWithPaymentRequestsForProjectFragment,
} from "src/__generated/graphql";
import { withRouter } from "storybook-addon-react-router-v6";

import PaymentForm from "./View";
import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import React from "react";
import withFormProvider from "src/test/storybook/decorators/withFormProvider";

const projectId = "yolo";
const BERNARDSTANISLAS: GithubUserWithPaymentRequestsForProjectFragment = {
  avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
  id: 4435377,
  login: "bernardstanislas",
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
  paymentRequests: [],
};
const OSCARWROCHE: GithubUserWithPaymentRequestsForProjectFragment = {
  login: "oscarwroche",
  avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  id: 21149076,
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
  paymentRequests: [],
};
const OFUX: GithubUserWithPaymentRequestsForProjectFragment = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  id: 595505,
  user: { id: "yolo" },
  __typename: "GithubUsers",
  htmlUrl: "",
  paymentRequests: [],
};
const ANTHONYBUISSET: GithubUserWithPaymentRequestsForProjectFragment = {
  login: "anthonybuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  id: 43467246,
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
  paymentRequests: [],
};
const TDELABRO: GithubUserWithPaymentRequestsForProjectFragment = {
  login: "tdelabro",
  avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
  id: 34384633,
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
  paymentRequests: [],
};

const mocks = [
  {
    request: {
      query: GetProjectContributorsForPaymentSelectDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: {
        projectsByPk: {
          __typename: "Projects",
          budgets: [],
          id: projectId,
          contributors: [
            BERNARDSTANISLAS,
            OSCARWROCHE,
            OFUX,
            ANTHONYBUISSET,
            TDELABRO,
            OSCARWROCHE,
            OFUX,
            ANTHONYBUISSET,
            TDELABRO,
            BERNARDSTANISLAS,
          ].map(githubUser => ({ __typename: "ProjectsContributorsView", githubUser })),
          githubRepos: [
            {
              projectId,
              githubRepoId: 123456,
              repoIssues: [],
            },
          ],
        },
      } as GetProjectContributorsForPaymentSelectQueryResult["data"],
    },
  },
];

const args = {
  budget: { initialAmount: 5000, remainingAmount: 3000 },
  onWorkEstimationChange: () => {
    return;
  },
  onWorkItemsChange: () => {
    return;
  },
  projectId,
  contributor: null,
  setContributor: () => {
    return;
  },
  unpaidPRs: [],
  requestNewPaymentMutationLoading: false,
};

export default {
  title: "PaymentForm",
  argTypes: {
    loading: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    withRouter,
    withMockedProvider(mocks),
    withFormProvider({
      defaultValues: {
        remainingBudget: args.budget.remainingAmount,
      },
    }),
  ],
};

export const Default = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PaymentForm {...args} />
    </div>
  ),

  parameters: {
    backgrounds: {
      default: "space",
    },
    docs: {
      // Prevents Storybook crash see https://github.com/storybookjs/storybook/issues/17098#issuecomment-1049679681
      source: {
        code: "Your code snippet goes here.",
        language: "yml",
        type: "auto",
      },
    },
  },
};
