import { ComponentStory } from "@storybook/react";
import HeaderCoverButton from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/HeaderCoverButton";
import { ProfileCover } from "src/__generated/graphql";

export default {
  title: "HeaderColorButton",
  component: HeaderCoverButton,
  argTypes: {
    cover: {
      options: [ProfileCover.Cyan, ProfileCover.Magenta, ProfileCover.Yellow, ProfileCover.Blue],
    },
    active: {
      control: { type: "boolean" },
    },
  },
};

const Template: ComponentStory<typeof HeaderCoverButton> = args => <HeaderCoverButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  active: true,
  cover: ProfileCover.Cyan,
};
