import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";

export default {
  title: "ContributorsTableFallback",
  component: ContributorsTableFallback,
};

const Template = () => <ContributorsTableFallback projectName="My Project" />;

export const Default = Template.bind({});
