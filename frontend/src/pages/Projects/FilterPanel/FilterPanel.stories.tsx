import { ProjectFilterProvider } from "src/pages/Projects/useProjectFilter";
import FilterPanel from "./View";

export default {
  title: "FilterPanel",
  component: FilterPanel,
};

const allProjectsArgs = {
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  availableSponsors: ["StarkNet Foundation", "Ethereum Foundation", "Theodo"],
  isProjectLeader: false,
};

export const AllProjects = {
  render: () => (
    <div style={{ width: 400 }}>
      <ProjectFilterProvider>
        <FilterPanel {...allProjectsArgs} />
      </ProjectFilterProvider>
    </div>
  ),
};

const allProjectsForProjectLeaderArgs = {
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  availableSponsors: ["StarkNet Foundation", "Ethereum Foundation", "Theodo"],
  isProjectLeader: true,
};

export const AllProjectsForProjectLeader = {
  render: () => (
    <div style={{ width: 400 }}>
      <ProjectFilterProvider>
        <FilterPanel {...allProjectsForProjectLeaderArgs} />
      </ProjectFilterProvider>
    </div>
  ),
};

const myProjectsArgs = {
  availableTechnologies: ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"],
  availableSponsors: ["StarkNet Foundation", "Ethereum Foundation", "Theodo"],
  isProjectLeader: true,
};

export const MyProjects = {
  render: () => (
    <div style={{ width: 400 }}>
      <ProjectFilterProvider>
        <FilterPanel {...myProjectsArgs} />
      </ProjectFilterProvider>
    </div>
  ),
};
