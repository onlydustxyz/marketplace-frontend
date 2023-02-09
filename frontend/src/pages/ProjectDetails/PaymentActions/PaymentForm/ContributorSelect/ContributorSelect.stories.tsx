import { ComponentStory } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { GithubContributorFragment } from "src/__generated/graphql";

import ContributorsSelect from "./View";

export default {
  title: "ContributorsSelect",
};

const contributors: GithubContributorFragment[] = [
  {
    id: 1111,
    login: "antho",
    avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
    user: null,
  },
  {
    id: 2222,
    login: "stan",
    avatarUrl: "https://avatars.githubusercontent.com/u/4435377?v=4",
    user: { userId: "user-id" },
  },
  {
    id: 3333,
    login: "ofux",
    avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    user: null,
  },
  {
    id: 4444,
    login: "oscar",
    avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
    user: { userId: "user-id" },
  },
];

const Template: ComponentStory<typeof ContributorsSelect> = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <ContributorsSelect {...args} />
    </FormProvider>
  );
};

const args = {
  loading: false,
  contributors,
  onContributorHandleChange: Function.prototype(),
  validateContributorLogin: Function.prototype(),
  clear: Function.prototype(),
};

export const Default = Template.bind({});
Default.args = args;
