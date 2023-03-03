import AllProjectsFallback from ".";

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
