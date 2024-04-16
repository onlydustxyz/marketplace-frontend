import { isFuture } from "date-fns";

import { components } from "src/__generated/api";

export function isHackathonFuture(hackathon: components["schemas"]["HackathonsListItemResponse"]) {
  const start = new Date(hackathon.startDate);

  return isFuture(start);
}
