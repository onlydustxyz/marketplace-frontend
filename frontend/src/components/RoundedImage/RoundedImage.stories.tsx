import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JSXElementConstructor } from "react";
import RoundedImage, { ImageSize, Rounding } from ".";

export default {
  title: "RoundedImage",
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: [ImageSize.Xs, ImageSize.Sm, ImageSize.Md, ImageSize.Lg, ImageSize.Xl],
    },
    rounding: {
      control: {
        type: "select",
      },
      options: [Rounding.Circle, Rounding.Corners],
    },
  },
} as ComponentMeta<typeof RoundedImage>;

const Template: ComponentStory<JSXElementConstructor<typeof args>> = args => <RoundedImage {...args} />;

export const Default = Template.bind({});

const args = {
  src: "https://www.soswildlifecontrol.com/wp-content/uploads/2017/02/Raccoon-Closeup.jpg",
  alt: "A damn raccoon",
  size: ImageSize.Md,
  rounding: Rounding.Corners,
};

Default.args = args;
