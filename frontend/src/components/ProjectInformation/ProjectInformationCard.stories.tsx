import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectInformationView from "./View";
import Card from "../Card";

export default {
  title: "ProjectInformation",
  component: ProjectInformationView,
} as ComponentMeta<typeof ProjectInformationView>;

const Template: ComponentStory<typeof ProjectInformationView> = args => (
  <Card>
    <ProjectInformationView {...args} />
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
    logoUrl: "https://avatars.githubusercontent.com/u/25772758?v=4",
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
