import FormInput, { InputErrorDisplay } from "./View";

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
    requiredForPayment: { type: "boolean" },
  },
};

type Props = {
  loading: boolean;
  error: boolean;
  errorType: InputErrorDisplay;
  requiredForPayment: boolean;
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
      requiredForPayment={args.requiredForPayment}
    />
  ),
};
