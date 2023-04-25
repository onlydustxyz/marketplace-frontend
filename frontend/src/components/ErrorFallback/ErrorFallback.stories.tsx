import ErrorFallback from ".";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "ErrorFallback",
  component: ErrorFallback,
  decorators: [withRouter],
};

export const Default = {
  render: () => <ErrorFallback />,
};
