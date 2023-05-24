import Tooltip, { TooltipPosition, withTooltip } from ".";

export default {
  title: "Tooltip",
  argTypes: {
    position: {
      control: {
        type: "select",
        options: [TooltipPosition.Bottom, TooltipPosition.Top, TooltipPosition.Left, TooltipPosition.Right],
      },
    },
  },
};

const args = {
  text: "Fill in your payment information to get paid",
  position: TooltipPosition.Bottom,
};

export const Default = {
  render: () => (
    <div className="w-96 h-96 flex items-center justify-center">
      <span {...withTooltip(args.text, { position: args.position })}>Hover me!</span>
      <Tooltip />
    </div>
  ),
};
