import { ComponentProps } from "react";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";
import Tooltip from "src/components/Tooltip";

export default {
  title: "AvailableConversion",
  component: AvailableConversion,
};

const defaultProps: ComponentProps<typeof AvailableConversion> = {
  currencies: [
    {
      amount: 1200,
      currency: "USD",
      dollar: 100,
    },
    {
      amount: 1200,
      currency: "OP",
      dollar: 100,
    },
    {
      amount: 1200,
      currency: "APT",
      dollar: 100,
    },
  ],
};

export const Default = {
  render: (args: ComponentProps<typeof AvailableConversion>) => (
    <div className="inline-flex">
      <AvailableConversion {...defaultProps} {...args} tooltipId="availableConversion-stories" />
      <Tooltip />
    </div>
  ),
};

export const WithoutTooltips = {
  render: (args: ComponentProps<typeof AvailableConversion>) => (
    <div className="inline-flex">
      <AvailableConversion {...defaultProps} {...args} />
      <Tooltip />
    </div>
  ),
};
