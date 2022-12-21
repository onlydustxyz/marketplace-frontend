import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectInformation from ".";
import Card from "../Card";

export default {
  title: "ProjectInformation",
  component: ProjectInformation,
} as ComponentMeta<typeof ProjectInformation>;

const Template: ComponentStory<typeof ProjectInformation> = args => (
  <Card>
    <ProjectInformation {...args} />
  </Card>
);

export const Default = Template.bind({});

Default.args = {
  name: "test",
  budget: {
    remainingAmount: 2000,
    initialAmount: 10000,
  },
  details: {
    telegramLink: "https://web.telegram.org/z/",
    description: "EVM interpreter written in Cairo, a sort of ZK-EVM emulator, leveraging STARK proof system.",
  },
  lead: {
    displayName: "Oscar le Boss",
    avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4",
  },
  githubRepoInfo: {
    owner: "facebook",
    name: "react",
    contributors: [{ login: "oscar666", avatarUrl: "https://avatars.githubusercontent.com/u/21149076?v=4" }],
    languages: { Cairo: 2200 },
  },
};
