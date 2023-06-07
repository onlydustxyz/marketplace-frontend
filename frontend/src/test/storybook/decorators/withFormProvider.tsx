/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

export default function withFormProvider(args?: FieldValues) {
  return (Story: StoryFn) => {
    const methods = useForm(args);

    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    );
  };
}
