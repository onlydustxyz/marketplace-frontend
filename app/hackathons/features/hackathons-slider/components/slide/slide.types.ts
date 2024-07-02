import { ListHackathonsItemResponse } from "api-client/resources/hackathons/types";

import { HackathonStatus } from "components/features/hackathons/hackathon-card";

export namespace TSlide {
  export interface Props extends ListHackathonsItemResponse {
    index: number;
    status: HackathonStatus;
  }
}
