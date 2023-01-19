import { ComponentStory, ComponentMeta } from "@storybook/react";

import CompletePaymentInformationButton from ".";

export default {
  title: "CompletePaymentInformationButton",
  component: CompletePaymentInformationButton,
} as ComponentMeta<typeof CompletePaymentInformationButton>;

const Template: ComponentStory<typeof CompletePaymentInformationButton> = () => <CompletePaymentInformationButton />;

export const Default = Template.bind({});

Default.args = {}; // put your component's args for the Default story here
