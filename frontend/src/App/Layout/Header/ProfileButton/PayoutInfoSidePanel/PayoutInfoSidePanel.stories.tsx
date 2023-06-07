import withMockedProvider from "src/test/storybook/decorators/withMockedProvider";
import PayoutInfoSidePanel from ".";
import withToasterProvider from "src/test/storybook/decorators/withToasterProvider";
import withSidePanelStackProvider from "src/test/storybook/decorators/withSidePanelStackProvider";

export default {
  title: "PayoutInfoSidePanel",
  component: PayoutInfoSidePanel,
  decorators: [withToasterProvider, withMockedProvider(), withSidePanelStackProvider],
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
