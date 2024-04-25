import { ListboxProps } from "@nextui-org/react";

import { TUseSearchProjects } from "components/features/search-projects/hooks/use-search-projects.types";

export namespace TSearchProjects {
  export type Project = TUseSearchProjects.Project;

  export interface ListboxItemSection {
    name: string;
    items: Project[];
    showDivider: boolean;
  }

  export interface Props {
    selectionMode?: "single" | "multiple";
    size?: "md" | "lg";
    onSelectProjects: (projects: Project[]) => void;
    initialValue?: Project;
    isElevated?: boolean;
    listboxProps?: Partial<ListboxProps<ListboxItemSection>>;
  }
}
