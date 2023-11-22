import { components } from "src/__generated/api";

export function isUserProjectLead(project: components["schemas"]["ProjectPageItemResponse"], githubUserId?: number) {
  if (!githubUserId) return false;

  return project.leaders.filter(leader => leader.githubUserId === githubUserId).length > 0;
}
