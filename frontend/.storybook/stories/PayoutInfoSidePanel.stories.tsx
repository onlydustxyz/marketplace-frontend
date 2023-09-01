import withMockedProvider from "../decorators/withMockedProvider";
import PayoutInfoSidePanel from "src/App/Layout/Header/ProfileButton/PayoutInfoSidePanel";
import withToasterProvider from "../decorators/withToasterProvider";
import withSidePanelStackProvider from "../decorators/withSidePanelStackProvider";

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
