import Callout from "src/components/Callout";

export default {
  title: "Callout",
  component: Callout,
  argTypes: {
    width: {
      control: { type: "range", min: "100", max: "800", step: "50" },
    },
  },
};

type Props = {
  width: number;
};

export const Default = {
  render: ({ width }: Props) => (
    <div style={{ width }}>
      <Callout>
        {"As a company, you’ll need to share an invoice for each payment in order to receive the funds."}
      </Callout>
    </div>
  ),
};
