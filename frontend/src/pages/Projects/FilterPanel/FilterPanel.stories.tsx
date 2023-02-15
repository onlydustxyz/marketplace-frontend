import { ProjectOwnershipType } from "..";
import FilterPanel, { FilterPanelViewProps } from "./View";

export default {
  title: "FilterPanel",
  component: (args: FilterPanelViewProps) => (
    <div style={{ width: 400 }}>
      <FilterPanel {...args} />
    </div>
  ),
};

export const AllProjects = {
  args: {
    technologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
    projectOwnershipType: ProjectOwnershipType.All,
    setProjectOwnershipType: () => {
      return;
    },
    isProjectLeader: false,
  },
};

export const AllProjectsForProjectLeader = {
  args: {
    technologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
    projectOwnershipType: ProjectOwnershipType.All,
    setProjectOwnershipType: () => {
      return;
    },
    isProjectLeader: true,
  },
};

export const MyProjects = {
  args: {
    technologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
    projectOwnershipType: ProjectOwnershipType.Mine,
    setProjectOwnershipType: () => {
      return;
    },
    isProjectLeader: true,
  },
};
