import AllProjectsFallback from "src/_pages/Projects/AllProjects/AllProjectsFallback";

export default {
  title: "AllProjectsFallback",
  component: AllProjectsFallback,
};

export const Default = {
  render: () => <AllProjectsFallback clearFilters={Function.prototype()} />,
  parameters: {
    backgrounds: { default: "space" },
  },
};
