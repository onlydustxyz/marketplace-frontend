import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import ProfileButton from "./View";
import withToasterProvider from "src/test/storybook/decorators/withToasterProvider";
import withSidePanelStackProvider from "src/test/storybook/decorators/withSidePanelStackProvider";
import withContributorProfilePanelProvider from "src/test/storybook/decorators/withContributorProfilePanelProvider";

export default {
  title: "ProfileButton",
  component: ProfileButton,
  decorators: [
    withToasterProvider,
    withMockedProvider(),
    withSidePanelStackProvider,
    withContributorProfilePanelProvider,
  ],
  argTypes: {
    payoutSettingsInvalid: { type: "boolean" },
  },
};

type Props = {
  avatarUrl: string;
  login: string;
  showMissingPayoutSettingsState: boolean;
  logout: () => void;
};

const props: Props = {
  avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
  login: "lechinoix",
  showMissingPayoutSettingsState: false,
  logout: () => {
    return;
  },
};

export const Default = {
  render: (args: Props) => (
    <div className="ml-32">
      <ProfileButton {...props} {...args} />
    </div>
  ),
};

export const MissingPayoutSettings = {
  render: (args: Props) => (
    <div className="ml-32">
      <ProfileButton {...props} {...{ showMissingPayoutSettingsState: true }} {...args} />
    </div>
  ),
};
