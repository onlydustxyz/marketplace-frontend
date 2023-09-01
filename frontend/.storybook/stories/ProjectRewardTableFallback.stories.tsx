import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import ProjectRewardTableFallback from "src/components/ProjectRewardTableFallback";

export default {
  title: "ProjectRewardTableFallback",
  component: ProjectRewardTableFallback,
  decorators: [withRouter],
} as ComponentMeta<typeof ProjectRewardTableFallback>;

const Template: ComponentStory<typeof ProjectRewardTableFallback> = () => <ProjectRewardTableFallback />;

export const Default = Template.bind({});
