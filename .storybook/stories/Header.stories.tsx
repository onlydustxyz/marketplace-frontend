import { RoutePaths } from "src/App";
import Header from "src/App/Layout/Header/View";
import { responsiveChromatic } from "src/test/utils";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";

export default {
  title: "Header",
  component: Header,
  parameters: responsiveChromatic,
  decorators: [withRouter, withAuthProvider(), withContributorProfilePanelProvider],
};

const args = {
  menuItems: {
    [RoutePaths.Projects]: "Projects",
    [RoutePaths.Rewards]: "Rewards",
  },
  isLoggedIn: false,
  selectedMenuItem: RoutePaths.Projects,
  impersonating: false,
};

export const Default = {
  render: () => <Header {...args} />,

  parameters: { layout: "fullscreen", backgrounds: { default: "space" } },
};
