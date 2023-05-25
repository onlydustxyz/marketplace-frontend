import { withRouter } from "storybook-addon-react-router-v6";

import ProfileButton from "./View";
import { ToasterProvider } from "src/hooks/useToaster";

export default {
  title: "ProfileButton",
  component: ProfileButton,
  decorators: [withRouter],
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
    <ToasterProvider>
      <div className="ml-32">
        <ProfileButton {...props} {...{ payoutSettingsInvalid: true }} {...args} />
      </div>
    </ToasterProvider>
  ),
};
