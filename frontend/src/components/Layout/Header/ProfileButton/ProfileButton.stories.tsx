import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import ProfileButton from "./View";

export default {
  title: "ProfileButton",
  component: ProfileButton,
  decorators: [withRouter],
} as ComponentMeta<typeof ProfileButton>;

const Template: ComponentStory<typeof ProfileButton> = args => (
  <div className="ml-32">
    <ProfileButton {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  avatarUrl: "https://avatars.githubusercontent.com/u/10167015?v=4",
  displayName: "lechinoix",
};
