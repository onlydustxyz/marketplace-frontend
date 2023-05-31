import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import PayoutInfoSidePanel from ".";
import withToasterProvider from "src/test/storybook/decorators/withToasterProvider";

export default {
  title: "PayoutInfoSidePanel",
  component: PayoutInfoSidePanel,
  decorators: [withToasterProvider, withMockedProvider()],
};

export const Default = {
  render: () => (
    <PayoutInfoSidePanel
      open={true}
      setOpen={() => {
        return;
      }}
    />
  ),
};
