import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "src/components/Button";

import InfoMissingBanner from ".";

export default {
  title: "InfoMissingBanner",
  component: InfoMissingBanner,
} as ComponentMeta<typeof InfoMissingBanner>;

const Template: ComponentStory<typeof InfoMissingBanner> = args => <InfoMissingBanner {...args} />;

export const Default = Template.bind({});

Default.args = {}; // put your component's args for the Default story here

export const WithButton = Template.bind({});

WithButton.args = {
  children: (
    <Button>
      <div>Complete payout information</div>
    </Button>
  ),
}; // put your component's args for the Default story here
