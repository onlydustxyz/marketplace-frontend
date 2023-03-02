import { gql } from "@apollo/client";
import { VisibleProjectFragment } from "src/__generated/graphql";

export function isProjectVisible(project: VisibleProjectFragment | null) {
  if (!project) {
    return false;
  }

  const hasLeaders = project.projectLeads.length > 0;
  const hasRepos = project.githubRepos.length > 0;
  const hasBudget = project.budgets.length > 0;
  const hasInvitation = project.pendingInvitations.length > 0;

  return hasRepos && hasBudget && (hasLeaders || hasInvitation);
}

export const VISIBLE_PROJECT_FRAGMENT = gql`
  fragment VisibleProject on Projects {
    id
    projectLeads {
      userId
    }
    githubRepos {
      githubRepoId
    }
    budgets {
      id
    }
    pendingInvitations {
      id
    }
  }
`;
