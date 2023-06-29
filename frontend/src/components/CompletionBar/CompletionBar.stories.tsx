import CompletionBar from ".";

export default {
  title: "CompletionBar",
  component: CompletionBar,
  argTypes: {
    completionScore: { control: { type: "range", min: "1", max: "20" } },
  },
};

export const Default = {
  render: () => (
    <div style={{ width: 400 }}>
      <CompletionBar completionScore={65} />
    </div>
  ),
};

export const None = {
  render: () => (
    <div style={{ width: 400 }}>
      <CompletionBar completionScore={0} />
    </div>
  ),
};

export const Full = {
  render: () => (
    <div style={{ width: 400 }}>
      <CompletionBar completionScore={100} />
    </div>
  ),
};
