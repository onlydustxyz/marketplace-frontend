import { ComponentStory, ComponentMeta } from "@storybook/react";

import MyProject from ".";

export default {
  title: "MyProject",
  component: MyProject,
} as ComponentMeta<typeof MyProject>;

const Template: ComponentStory<typeof MyProject> = args => <MyProject {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "test",
  budget: { remainingAmount: 500, initialAmount: 1000 },
  details: { telegramLink: "https://web.telegram.org/z/", description: "Test description" },
};
