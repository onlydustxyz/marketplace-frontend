import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import FormInput, { InputErrorType } from "./View";

export default {
  title: "FormInput",
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => (
  <FormInput
    {...props}
    loading={args.loading}
    error={args.error ? { message: args.errorMessage } : undefined}
    errorType={args.errorType}
  />
);

const args = {
  loading: false,
  error: false,
  errorMessage: "Invalid value",
  errorType: InputErrorType.Normal,
};

const props = {
  name: "name",
  label: "Label",
  type: "text",
  placeholder: "Placeholder",
};

export const Default = Template.bind({});
Default.args = args;
