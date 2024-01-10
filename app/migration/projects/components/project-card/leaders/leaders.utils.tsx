import { TProjects } from "app/migration/projects/types/projects.types";

export function formatLeadNames(leaders: TProjects.Leader[]) {
  return leaders.map(leader => leader.login || "").join(", ");
}
