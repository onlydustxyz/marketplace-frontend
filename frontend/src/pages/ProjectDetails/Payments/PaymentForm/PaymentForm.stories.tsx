import { MockedProvider } from "@apollo/client/testing";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  GetProjectContributorsForPaymentSelectDocument,
  GetProjectContributorsForPaymentSelectQueryResult,
  GithubUserFragment,
} from "src/__generated/graphql";
import { withRouter } from "storybook-addon-react-router-v6";

import PaymentForm from "./View";

export default {
  title: "PaymentForm",
  argTypes: {
    loading: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [withRouter],
} as ComponentMeta<typeof PaymentForm>;

const projectId = "yolo";
const BERNARDSTANISLAS: GithubUserFragment = {
  avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
  id: 4435377,
  login: "bernardstanislas",
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
};
const OSCARWROCHE: GithubUserFragment = {
  login: "oscarwroche",
  avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  id: 21149076,
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
};
const OFUX: GithubUserFragment = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  id: 595505,
  user: { userId: "yolo" },
  __typename: "GithubUsers",
  htmlUrl: "",
};
const ANTHONYBUISSET: GithubUserFragment = {
  login: "anthonybuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  id: 43467246,
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
};
const TDELABRO: GithubUserFragment = {
  login: "tdelabro",
  avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
  id: 34384633,
  user: null,
  __typename: "GithubUsers",
  htmlUrl: "",
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
          budgets: [],
          id: projectId,
          githubRepos: [
            {
              projectId,
              githubRepoId: 123456,
              repoIssues: [],
              repoContributors: [
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
            },
          ],
        },
      } as GetProjectContributorsForPaymentSelectQueryResult["data"],
    },
  },
];

const Template: ComponentStory<typeof PaymentForm> = args => {
  const methods = useForm({
    defaultValues: {
      remainingBudget: args.budget.remainingAmount,
    },
  });
  return (
    <MockedProvider mocks={mocks}>
      <FormProvider {...methods}>
        <div className="flex flex-col gap-6">
          <PaymentForm {...args} />
        </div>
      </FormProvider>
    </MockedProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
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
  unpaidIssues: [],
};

Default.parameters = {
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
};
