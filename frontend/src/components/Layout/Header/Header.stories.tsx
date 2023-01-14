import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RoutePaths } from "src/App";
import { withRouter } from "storybook-addon-react-router-v6";

import Header from "./View";

export default {
  title: "Header",
  component: Header,
  decorators: [withRouter],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  menuItems: {
    [RoutePaths.Projects]: "Projects",
    [RoutePaths.MyProjectDetails]: "My Projects",
    [RoutePaths.MyContributions]: "Payments",
  },
  isLoggedIn: false,
  selectedMenuItem: RoutePaths.Projects,
};
