import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  hackathonRegistrations = "hackathonRegistrations",
  getMyCommitteeAssignments = "getMyCommitteeAssignments",
  getMyCommitteeAssignmentProject = "getMyCommitteeAssignmentProject",
  updateMyCommitteeAssignmentProject = "updateMyCommitteeAssignmentProject",
  get_my_recommended_projects = "get_my_recommended_projects",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  hackathonRegistrations: {
    url: "me/hackathons/:hackathonId/registrations",
    method: "PUT",
  },
  getMyCommitteeAssignments: {
    url: "me/committees/:committeeId",
    method: "GET",
  },
  getMyCommitteeAssignmentProject: {
    url: "me/committees/:committeeId/projects/:projectId",
    method: "GET",
  },
  updateMyCommitteeAssignmentProject: {
    url: "me/committees/:committeeId/projects/:projectId",
    method: "PUT",
  },
  get_my_recommended_projects: {
    url: "me/recommended-projects",
    method: "GET",
  },
};

export default Adapters;
