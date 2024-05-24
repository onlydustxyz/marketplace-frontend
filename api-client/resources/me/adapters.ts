import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  hackathonRegistrations = "hackathonRegistrations",
  getMyCommitteeAssignments = "getMyCommitteeAssignments",
  getMyCommitteeAssignmentProject = "getMyCommitteeAssignmentProject",
  updateMyCommitteeAssignmentProject = "updateMyCommitteeAssignmentProject",
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
};

export default Adapters;
