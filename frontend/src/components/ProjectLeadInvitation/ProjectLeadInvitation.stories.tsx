import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectLeadInvitation from ".";

export default {
  title: "ProjectLeadInvitation",
  component: ProjectLeadInvitation,
} as ComponentMeta<typeof ProjectLeadInvitation>;

const Template: ComponentStory<typeof ProjectLeadInvitation> = args => <ProjectLeadInvitation {...args} />;

export const Default = Template.bind({});

Default.args = {};
