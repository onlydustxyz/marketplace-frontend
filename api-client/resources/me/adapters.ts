import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  hackathonRegistrations = "hackathonRegistrations",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  hackathonRegistrations: {
    url: "me/hackathons/:hackathonId/registrations",
    method: "PUT",
  },
};

export default Adapters;
