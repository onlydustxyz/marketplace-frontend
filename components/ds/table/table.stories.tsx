import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { Card } from "components/ds/card/card";

import { Table } from "./table";

type Story = StoryObj<typeof Table>;

const defaultProps: ComponentProps<typeof Table> = {
  label: "Table label",
  columns: [
    { key: "col1", children: "Column 1", icon: { remixName: "ri-error-warning-line" } },
    { key: "col2", children: "Column 2", icon: { customName: "dollar" } },
    { key: "col3", children: "Column 3" },
    { key: "col4", children: "Actions", align: "end", showOnHover: true },
  ],
  rows: [
    {
      key: "row1",
      col1: "Column 1, Row 1",
      col2: "Column 2, Row 1",
      col3: "Column 3, Row 1",
      col4: <button onClick={() => alert("Hello world")}>Action button</button>,
    },
    {
      key: "row2",
      col1: "Column 1, Row 2",
      col2: "Column 2, Row 2",
      col3: "Column 3, Row 2",
      col4: <button onClick={() => alert("Hello world")}>Action button</button>,
    },
    {
      key: "row3",
      col1: "Column 1, Row 3",
      col2: "Column 2, Row 3",
      col3: "Column 3, Row 3",
      col4: <button onClick={() => alert("Hello world")}>Action button</button>,
    },
    {
      key: "row3",
      col1: "Column 1, Row 4",
      col2: "Column 2, Row 4",
      col3: "Column 3, Row 4",
      col4: <button onClick={() => alert("Hello world")}>Action button</button>,
    },
  ],
};

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Design system/Table",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0E0814" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return (
      <Card background={"base"}>
        <Table {...defaultProps} {...args} />
      </Card>
    );
  },
};

export default meta;
