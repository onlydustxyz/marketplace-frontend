import { withRouter } from "storybook-addon-react-router-v6";

import PaymentForm from "./View";
import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import React from "react";
import withFormProvider from "src/test/storybook/decorators/withFormProvider";
import {
  ContributorFragment,
  GetProjectContributorsDocument,
  GetProjectContributorsQueryResult,
} from "src/__generated/graphql";

const projectId = "yolo";
const BERNARDSTANISLAS: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 4435377,
  login: "bernardstanislas",
  avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
  userId: null,
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};
const OSCARWROCHE: ContributorFragment = {
  login: "oscarwroche",
  avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  githubUserId: 21149076,
  userId: null,
  __typename: "UserProfiles",
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};
const OFUX: ContributorFragment = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  githubUserId: 595505,
  userId: "yolo",
  __typename: "UserProfiles",
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};
const ANTHONYBUISSET: ContributorFragment = {
  login: "anthonybuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  githubUserId: 43467246,
  userId: null,
  __typename: "UserProfiles",
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};
const TDELABRO: ContributorFragment = {
  __typename: "UserProfiles",
  githubUserId: 34384633,
  login: "tdelabro",
  avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
  userId: null,
  contributionStatsAggregate: { aggregate: { sum: { paidCount: 0, unpaidCount: 0 } } },
  paymentStatsAggregate: { aggregate: { sum: { moneyGranted: 0 } } },
};

const mocks = [
  {
    request: {
      query: GetProjectContributorsDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: {
        projectsContributorsView: [
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
        ].map(user => ({ user })),
      } as GetProjectContributorsQueryResult["data"],
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
