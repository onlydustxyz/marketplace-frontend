import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  hackathon_registrations = "hackathon_registrations",
  get_my_committee_assignments = "get_my_committee_assignments",
  get_my_committee_assignment_project = "get_my_committee_assignment_project",
  update_my_committee_assignment_project = "update_my_committee_assignment_project",
  get_my_recommended_projects = "get_my_recommended_projects",
  get_my_rewards = "get_my_rewards",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  hackathon_registrations: {
    url: "me/hackathons/:hackathonId/registrations",
    method: "PUT",
  },
  get_my_committee_assignments: {
    url: "me/committees/:committeeId",
    method: "GET",
  },
  get_my_committee_assignment_project: {
    url: "me/committees/:committeeId/projects/:projectId",
    method: "GET",
  },
  update_my_committee_assignment_project: {
    url: "me/committees/:committeeId/projects/:projectId",
    method: "PUT",
  },
  get_my_rewards: {
    url: "me/rewards",
    method: "GET",
  },
  get_my_recommended_projects: {
    url: "me/recommended-projects",
    method: "GET",
  },
};

export default Adapters;
