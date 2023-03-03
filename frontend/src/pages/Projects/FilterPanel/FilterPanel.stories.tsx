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

const allProjectsArgs = {
  projectFilter: {
    technologies: [],
    ownershipType: ProjectOwnershipType.All,
  },
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  setProjectFilter: () => {
    return;
  },
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
  setProjectFilter: () => {
    return;
  },
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
  setProjectFilter: () => {
    return;
  },
  isProjectLeader: true,
};

export const MyProjects = {
  render: () => (
    <div style={{ width: 400 }}>
      <FilterPanel {...myProjectsArgs} />
    </div>
  ),
};
