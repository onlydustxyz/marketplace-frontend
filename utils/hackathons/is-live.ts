import { isFuture, isPast } from "date-fns";

import { components } from "src/__generated/api";

export function isHackathonLive(hackathon: components["schemas"]["HackathonsListItemResponse"]) {
  const start = new Date(hackathon.startDate);
  const end = new Date(hackathon.endDate);

  return isPast(start) && isFuture(end);
}
