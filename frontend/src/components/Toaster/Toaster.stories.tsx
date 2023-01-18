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
    visible: true,
    isError: false,
  }
);

export const Error = Template.bind(
  {},
  {
    message: "Oops somthing bad happened!",
    visible: true,
    isError: true,
  }
);

export const LongError = Template.bind(
  {},
  {
    message: "Oops somthing bad happened! This is a very long error message with a lot of content.",
    visible: true,
    isError: true,
  }
);
