import { ComponentStory, ComponentMeta } from "@storybook/react";
import CompletePaymentInformationButton from "src/pages/MyContributions/CompletePaymentInformationButton";

import InfoMissingBanner from ".";

export default {
  title: "InfoMissingBanner",
  component: InfoMissingBanner,
} as ComponentMeta<typeof InfoMissingBanner>;

const Template: ComponentStory<typeof InfoMissingBanner> = args => <InfoMissingBanner {...args} />;

export const Default = Template.bind({});

Default.args = {}; // put your component's args for the Default story here

export const WithButton = Template.bind({
  children: (
    <CompletePaymentInformationButton>
      <div>Complete payment information</div>
    </CompletePaymentInformationButton>
  ),
});

WithButton.args = {}; // put your component's args for the Default story here
