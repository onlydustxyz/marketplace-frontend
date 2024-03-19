import { ComponentProps } from "react";
import { Money } from "utils/Money";

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
      currency: Money.fromSchema({ code: Money.Static.Currency.USD }),
      dollar: 100,
    },
    {
      amount: 1200,
      currency: Money.fromSchema({ code: Money.Static.Currency.OP }),
      dollar: 100,
    },
    {
      amount: 1200,
      currency: Money.fromSchema({ code: Money.Static.Currency.APT }),
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

export const Compact = {
  render: (args: ComponentProps<typeof AvailableConversion>) => (
    <div className="inline-flex">
      <AvailableConversion {...defaultProps} {...args} totalAmount={1200} tooltipId="availableConversion-stories" />
      <Tooltip />
    </div>
  ),
};

export const Full = {
  render: (args: ComponentProps<typeof AvailableConversion>) => (
    <div className="inline-flex">
      <AvailableConversion {...defaultProps} {...args} totalAmount={1200} tooltipId="availableConversion-stories" />
      <Tooltip />
    </div>
  ),
};

export const OneCurrency = {
  render: (args: ComponentProps<typeof AvailableConversion>) => (
    <div className="inline-flex">
      <AvailableConversion
        {...defaultProps}
        {...args}
        totalAmount={1200}
        tooltipId="availableConversion-stories"
        currencies={[
          {
            amount: 1200,
            currency: Money.fromSchema({ code: Money.Static.Currency.OP }),
            dollar: 100,
          },
        ]}
      />
      <Tooltip />
    </div>
  ),
};

export const WithWrapper = {
  render: () => (
    <div
      className="inline-flex rounded-full border border-white/25 bg-white/8 px-3 py-[6px]"
      data-tooltip-id="availableConversion-stories"
    >
      <Tooltip />
    </div>
  ),
};
