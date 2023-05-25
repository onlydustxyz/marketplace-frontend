import { ToasterProvider } from "src/hooks/useToaster";
import PayoutInfoSidePanel from ".";
import { MockedProvider } from "@apollo/client/testing";

export default {
  title: "PayoutInfoSidePanel",
  component: PayoutInfoSidePanel,
  decorators: [],
};

export const Default = {
  render: () => (
    <ToasterProvider>
      <MockedProvider>
        <PayoutInfoSidePanel
          open={true}
          setOpen={() => {
            return;
          }}
        />
      </MockedProvider>
    </ToasterProvider>
  ),
};
