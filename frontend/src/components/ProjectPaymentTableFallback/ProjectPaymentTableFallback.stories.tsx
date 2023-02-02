import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectPaymentTableFallback from ".";

export default {
  title: "ProjectPaymentTableFallback",
  component: ProjectPaymentTableFallback,
} as ComponentMeta<typeof ProjectPaymentTableFallback>;

const Template: ComponentStory<typeof ProjectPaymentTableFallback> = () => (
  <ProjectPaymentTableFallback
    onClick={() => {
      return;
    }}
  />
);

export const Default = Template.bind({});
