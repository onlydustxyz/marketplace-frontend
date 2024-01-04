import { Leader } from "../../../types/projects.types.ts";

export const formatLeadNames = (leaders: Leader[]) => leaders.map(leader => leader.login || "").join(", ");
