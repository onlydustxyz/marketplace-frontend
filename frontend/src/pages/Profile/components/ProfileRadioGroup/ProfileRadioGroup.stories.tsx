import { ComponentStory } from "@storybook/react";
import ProfileRadioGroup from "./View";

export default {
  title: "ProfileRadioGroup",
};

const Template: ComponentStory<typeof ProfileRadioGroup> = () => <ProfileRadioGroup {...props} />;

const props = {
  label: "Preferred method",
  options: [
    { value: "ETH", label: "Eth wire" },
    { value: "BANK", label: "Crypto wire" },
  ],
};

export const Default = Template.bind({});
