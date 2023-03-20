import { ProjectOwnershipType } from "src/pages/Projects/types";
import FilterPanel, { FilterPanelViewProps } from "./View";

export default {
  title: "FilterPanel",
  component: (args: FilterPanelViewProps) => (
    <div style={{ width: 400 }}>
      <FilterPanel {...args} />
    </div>
  ),
};

const allProjectsArgs = {
  projectFilter: {
    technologies: [],
    ownershipType: ProjectOwnershipType.All,
  },
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  dispatchProjectFilter: () => {
    return;
  },
  isProjectFilterCleared: () => false,
  isProjectLeader: false,
};

export const AllProjects = {
  render: () => (
    <div style={{ width: 400 }}>
      <FilterPanel {...allProjectsArgs} />
    </div>
  ),
};

const allProjectsForProjectLeaderArgs = {
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  projectFilter: {
    ownershipType: ProjectOwnershipType.All,
    technologies: [],
  },
  dispatchProjectFilter: () => {
    return;
  },
  isProjectFilterCleared: () => false,
  isProjectLeader: true,
};

export const AllProjectsForProjectLeader = {
  render: () => (
    <div style={{ width: 400 }}>
      <FilterPanel {...allProjectsForProjectLeaderArgs} />
    </div>
  ),
};

const myProjectsArgs = {
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  projectFilter: { technologies: [], ownershipType: ProjectOwnershipType.Mine },
  dispatchProjectFilter: () => {
    return;
  },
  isProjectFilterCleared: () => false,
  isProjectLeader: true,
};

export const MyProjects = {
  render: () => (
    <div style={{ width: 400 }}>
      <FilterPanel {...myProjectsArgs} />
    </div>
  ),
};
