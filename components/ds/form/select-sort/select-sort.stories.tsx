import type { Meta, StoryObj } from "@storybook/react";

import { SelectSort } from "./select-sort";
import { ProjectTypes } from "src/api/Project/types";

const meta: Meta<typeof SelectSort> = {
  component: SelectSort,
  title: "Design system/Form/SelectSort",
  tags: ["autodocs"],
  parameters: {
    height: 500,
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
    docs: { iframeHeight: 600 },
  },
};

export default meta;
type Story = StoryObj<typeof SelectSort>;

export const Default: Story = {
  render: () => {
    return (
      <div className="h-80 w-80">
        <SelectSort
          labelToken="projects.sorting.label"
          value={ProjectTypes.Sorting.ContributorsCount}
          onChange={() => null}
          options={[
            {
              label: "Trending",
              id: ProjectTypes.Sorting.Trending,
            },
            {
              label: "Project Name",
              id: ProjectTypes.Sorting.ProjectName,
            },
            {
              label: "Repos Count",
              id: ProjectTypes.Sorting.ReposCount,
            },
            {
              label: "Contributors Count",
              id: ProjectTypes.Sorting.ContributorsCount,
            },
          ]}
        />
      </div>
    );
  },
};
