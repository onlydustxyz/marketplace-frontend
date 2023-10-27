import { ComponentProps } from "react";
import ProfileButton from "src/App/Layout/Header/ProfileButton/View";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import withSidePanelProvider from "../decorators/withSidePanelProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";
import withToasterProvider from "../decorators/withToasterProvider";

export default {
  title: "ProfileButton",
  component: ProfileButton,
  decorators: [
    withAuthProvider,
    withToasterProvider,
    withMockedProvider(),
    withContributorProfilePanelProvider,
    withSidePanelProvider,
    withSidePanelStackProvider,
  ],
  argTypes: {
    payoutSettingsInvalid: { type: "boolean" },
  },
};

const props: ComponentProps<typeof ProfileButton> = {
  avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
  login: "lechinoix",
  logout: () => {},
  isMissingPayoutSettingsInfo: false,
};

export const Default = {
  render: (args: ComponentProps<typeof ProfileButton>) => (
    <div className="ml-32">
      <ProfileButton {...props} {...args} />
    </div>
  ),
};

export const MissingPayoutSettings = {
  render: (args: ComponentProps<typeof ProfileButton>) => (
    <div className="ml-32">
      <ProfileButton {...props} {...{ showMissingPayoutSettingsState: true }} {...args} />
    </div>
  ),
};
