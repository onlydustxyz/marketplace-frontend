import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectCard from ".";

export default {
  title: "MyProject",
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = args => <ProjectCard {...args} />;

export const MyProject = Template.bind({});

MyProject.args = {
  name: "test",
  budget: { remainingAmount: 500, initialAmount: 1000 },
  details: { telegramLink: "https://web.telegram.org/z/", description: "Test description" },
};

export const Project = Template.bind({});

Project.args = {
  name: "test",
  details: { telegramLink: "https://web.telegram.org/z/", description: "Test description" },
};
