import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor } from "react";
import Contributor from ".";

export default {
  title: "Contributor",
};

const contributor = {
  login: "ofux",
  avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
  isRegistered: true,
};

const Template: ComponentStory<JSXElementConstructor<typeof args>> = (args: { clickable: boolean }) => (
  <div className="group/line">
    <Contributor
      onClick={
        args.clickable
          ? () => {
              return;
            }
          : undefined
      }
      contributor={contributor}
    />
  </div>
);

const args = { clickable: false };
export const Default = Template.bind({});
Default.args = args;
