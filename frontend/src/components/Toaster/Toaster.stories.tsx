import { ComponentStory, ComponentMeta } from "@storybook/react";
import Toaster from "./View";

export default {
  title: "Toaster",
  component: Toaster,
} as ComponentMeta<typeof Toaster>;

const Template: ComponentStory<typeof Toaster> = args => <Toaster {...args} />;

export const Default = Template.bind(
  {},
  {
    message: "Payment information successfully updated",
  }
);
