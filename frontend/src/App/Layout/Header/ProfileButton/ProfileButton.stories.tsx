import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import ProfileButton from "./View";
import withToasterProvider from "src/test/storybook/decorators/withToasterProvider";

export default {
  title: "ProfileButton",
  component: ProfileButton,
  decorators: [withToasterProvider, withMockedProvider()],
  argTypes: {
    payoutSettingsInvalid: { type: "boolean" },
  },
};

type Props = {
  avatarUrl: string;
  login: string;
  payoutSettingsInvalid: boolean;
  logout: () => void;
};

const props: Props = {
  avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
  login: "lechinoix",
  payoutSettingsInvalid: false,
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
      <ProfileButton {...props} {...{ payoutSettingsInvalid: true }} {...args} />
    </div>
  ),
};
