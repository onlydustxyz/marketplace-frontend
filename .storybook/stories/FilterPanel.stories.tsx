import { ProjectFilterProvider } from "src/pages/Projects/useProjectFilter";
import FilterPanel from "src/pages/Projects/FilterPanel/View";

export default {
  title: "FilterPanel",
  component: FilterPanel,
};

const availableTechnologies = ["Cairo", "Python", "Rust", "Dart", "JS", "Ruby", "Golang"];

const availableSponsors = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    logoUrl: "",
    name: "StarkNet Foundation",
    url: "https://www.starknet.io/en",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66a456",
    logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
    name: "Ethereum Foundation",
    url: "https://ethereum.org",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66a123",
    logoUrl: "",
    name: "Theodo",
    url: "https://www.theodo.fr/",
  },
];

const allProjectsArgs = {
  availableTechnologies,
  availableSponsors,
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
  availableTechnologies,
  availableSponsors,
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
  availableTechnologies,
  availableSponsors,
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
