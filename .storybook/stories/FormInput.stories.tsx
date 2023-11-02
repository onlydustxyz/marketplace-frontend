import { JSXElementConstructor } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Size } from "src/components/FormInput";
import { InputErrorDisplay } from "src/components/FormInput/types";
import FormInput from "src/components/FormInput/View";

export default {
  title: "FormInput",
  argTypes: {
    errorType: {
      control: {
        type: "select",
      },
      options: [InputErrorDisplay.Normal, InputErrorDisplay.Banner],
    },
    error: { type: "boolean" },
    loading: { type: "boolean" },
    showRequiredError: { type: "boolean" },
  },
  decorators: [
    (Story: JSXElementConstructor<any>) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
};

type Props = {
  loading: boolean;
  error: boolean;
  errorType: InputErrorDisplay;
  showRequiredError: boolean;
};

const props = {
  name: "name",
  label: "Label",
  type: "text",
  placeholder: "Placeholder",
  register: {
    onChange: () => {
      return Promise.resolve();
    },
    onBlur: () => {
      return Promise.resolve();
    },
    ref: () => "yolo",
    name: "yolo",
  },
};

export const Default = {
  render: (args: Props) => (
    <FormInput
      {...props}
      loading={args.loading}
      error={args.error ? { message: "Invalid value" } : undefined}
      errorDisplay={args.errorType}
      showValidationErrors={true}
      showRequiredError={args.showRequiredError}
      withMargin={true}
      size={Size.Md}
    />
  ),
};
