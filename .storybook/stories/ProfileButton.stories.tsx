import withMockedProvider from "../decorators/withMockedProvider";
import ProfileButton from "src/components/App/Layout/Header/ProfileButton/View";
import withToasterProvider from "../decorators/withToasterProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withSidePanelProvider from "../decorators/withSidePanelProvider";

export default {
  title: "ProfileButton",
  component: ProfileButton,
  decorators: [
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
