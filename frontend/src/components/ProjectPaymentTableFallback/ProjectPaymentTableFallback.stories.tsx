import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import ProjectPaymentTableFallback from ".";

export default {
  title: "ProjectPaymentTableFallback",
  component: ProjectPaymentTableFallback,
  decorators: [withRouter],
} as ComponentMeta<typeof ProjectPaymentTableFallback>;

const Template: ComponentStory<typeof ProjectPaymentTableFallback> = () => <ProjectPaymentTableFallback />;

export const Default = Template.bind({});
