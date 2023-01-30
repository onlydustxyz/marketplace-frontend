import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import PaymentForm from "./View";

export default {
  title: "PaymentForm",
  component: PaymentForm,
} as ComponentMeta<typeof PaymentForm>;

const Template: ComponentStory<typeof PaymentForm> = args => {
  const methods = useForm();
  return (
    <div className="w-96">
      <FormProvider {...methods}>
        <PaymentForm {...args} />
      </FormProvider>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  loading: false,
  budget: { initialAmount: 5000, remainingAmount: 3000 },
  onWorkEstimationChange: () => {
    return;
  },
  onContributorLoginChange: () => {
    return;
  },
  validateContributorLogin: () => {
    return true;
  },
};

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};
