import { ListboxProps } from "@nextui-org/react";

import { ProjectPageItemResponse } from "src/types";

export namespace TSearchProjects {
  export interface ListboxItemSection {
    name: string;
    items: ProjectPageItemResponse[];
    showDivider: boolean;
  }

  export interface Props {
    selectionMode?: "single" | "multiple";
    size?: "md" | "lg";
    onSelectProjects: (projects: ProjectPageItemResponse[]) => void;
    initialValue?: ProjectPageItemResponse;
    isElevated?: boolean;
    listboxProps?: Partial<ListboxProps<ListboxItemSection>>;
  }
}
