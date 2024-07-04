import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  hackathon_registrations = "hackathon_registrations",
  get_my_committee_assignments = "get_my_committee_assignments",
  get_my_committee_assignment_project = "get_my_committee_assignment_project",
  update_my_committee_assignment_project = "update_my_committee_assignment_project",
  get_my_recommended_projects = "get_my_recommended_projects",
  get_my_journey = "get_my_journey",
  get_my_rewards = "get_my_rewards",
  logout_user = "logout_user",
  post_my_application = "post_my_application",
  update_my_application = "update_my_application",
  delete_banner_by_id = "delete_banner_by_id",
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
  get_my_journey: {
    url: "me/journey",
    method: "GET",
  },
  logout_user: {
    url: "me/logout",
    method: "POST",
  },
  post_my_application: {
    url: "me/applications",
    method: "POST",
  },
  update_my_application: {
    url: "me/applications/:applicationId",
    method: "PUT",
  },
  delete_banner_by_id: {
    url: "me/banners/:bannerId",
    method: "DELETE",
  },
};

export default Adapters;
