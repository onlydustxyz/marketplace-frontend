import { ComponentStory, ComponentMeta } from "@storybook/react";
import GitRepositoryLine from "src/icons/GitRepositoryLine";

import Tag from ".";

export default {
  title: "Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => (
  <Tag {...args}>
    <GitRepositoryLine />3 repositories
  </Tag>
);

export const Default = Template.bind({});

Default.args = {};
