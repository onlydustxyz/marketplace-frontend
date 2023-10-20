import { ComponentProps } from "react";
import { ShowMore } from "src/components/Table/ShowMore";

export default {
  title: "TableShowMore",
  component: ShowMore,
};

const defaultProps: ComponentProps<typeof ShowMore> = {
  onClick: () => {},
  loading: false,
};

export const Default = {
  render: (args: typeof ShowMore) => <ShowMore {...defaultProps} {...args} />,
};
