import { ComponentStory, ComponentMeta } from "@storybook/react";

import Project from ".";

export default {
  title: "Project Details Card",
  component: Project,
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = args => <Project {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "test",
  details: { telegramLink: "https://web.telegram.org/z/", description: "Test description" },
};
