import { MockedProvider } from "@apollo/client/testing";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { FIND_USER_QUERY } from "src/hooks/useIsGithubLoginValid";
import { GET_PROJECT_CONTRIBUTORS_QUERY } from "src/pages/ProjectDetails/PaymentActions/PaymentForm/ContributorSelect";
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
const BERNARDSTANISLAS = {
  avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
  id: 4435377,
  login: "bernardstanislas",
  user: null,
  __typename: "User",
};
const OSCARWROCHE = {
  login: "oscarwroche",
  avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  id: 21149076,
  user: null,
  __typename: "User",
};
const OFUX = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  id: 595505,
  user: { userId: "yolo" },
  __typename: "User",
};
const ANTHONYBUISSET = {
  login: "anthonybuisset",
  avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
  id: 43467246,
  user: null,
  __typename: "User",
};
const TDELABRO = {
  login: "tdelabro",
  avatarUrl: "https://avatars.githubusercontent.com/u/34384633?v=4",
  id: 34384633,
  user: null,
  __typename: "User",
};

const mocks = [
  {
    request: {
      query: GET_PROJECT_CONTRIBUTORS_QUERY,
      variables: {
        projectId,
      },
    },
    result: {
      data: {
        projectsByPk: {
          githubRepo: {
            content: {
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
              ],
            },
          },
        },
      },
    },
  },
  {
    request: {
      query: FIND_USER_QUERY,
      variables: {
        username: "bernardstanislas",
      },
    },
    result: {
      data: {
        fetchUserDetails: BERNARDSTANISLAS,
      },
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
        <PaymentForm {...args} />
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
  projectId,
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
