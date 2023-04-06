import { gql } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { ImpersonatedLeadProjectsQuery, ImpersonatedUserQuery } from "src/__generated/graphql";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { CustomUserRole, HasuraUserRole, Locale, User } from "src/types";

export const useImpersonation = () => {
  const { impersonationSet, clearImpersonationSet, setCustomClaims } = useImpersonationClaims();

  const impersonatedUserQuery = useHasuraQuery<ImpersonatedUserQuery>(IMPERSONATED_USER_QUERY, HasuraUserRole.Admin, {
    variables: {
      id: impersonationSet?.userId,
    },
    skip: !impersonationSet,
  });
  const impersonating = !!impersonatedUserQuery.data;

  const leadProjectsQuery = useHasuraQuery<ImpersonatedLeadProjectsQuery>(
    IMPERSONATED_LEAD_PROJECTS_QUERY,
    HasuraUserRole.Admin,
    {
      variables: {
        userId: impersonationSet?.userId,
      },
      skip: !impersonationSet,
    }
  );

  const impersonatedUser = impersonatedUserQuery.data?.user
    ? mapImpersonatedUser(impersonatedUserQuery.data.user)
    : null;

  const impersonatedGithubUserId = impersonatedUserQuery.data?.user?.githubUser?.githubUserId as number | undefined;
  const impersonatedLedProjectIds: string[] = useMemo(
    () => leadProjectsQuery.data?.projectLeads.map(lead => lead.projectId) ?? [],
    [leadProjectsQuery.data]
  );

  const impersonatedRoles =
    impersonatedLedProjectIds.length > 0
      ? [HasuraUserRole.RegisteredUser, CustomUserRole.ProjectLead]
      : [HasuraUserRole.RegisteredUser];

  useEffect(() => {
    if (impersonatedGithubUserId === undefined || impersonatedLedProjectIds.length === 0) {
      return;
    }
    setCustomClaims({
      githubUserId: impersonatedGithubUserId,
      projectsLeaded: impersonatedLedProjectIds,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [impersonatedLedProjectIds, impersonatedGithubUserId]);

  return {
    impersonating,
    impersonatedRoles,
    impersonatedUser,
    impersonatedGithubUserId,
    impersonatedLedProjectIds,
    stopImpersonation: clearImpersonationSet,
  };
};

const IMPERSONATED_USER_QUERY = gql`
  query ImpersonatedUser($id: uuid!) {
    user(id: $id) {
      id
      createdAt
      displayName
      email
      avatarUrl
      locale
      isAnonymous
      defaultRole
      emailVerified
      phoneNumber
      phoneNumberVerified
      activeMfaType
      roles {
        role
      }
      githubUser {
        githubUserId
      }
    }
  }
`;

const IMPERSONATED_LEAD_PROJECTS_QUERY = gql`
  query ImpersonatedLeadProjects($userId: uuid!) {
    projectLeads(where: { userId: { _eq: $userId } }) {
      projectId
    }
  }
`;

const mapImpersonatedUser = (user: ImpersonatedUserQuery["user"]): User | null => {
  if (user === null) {
    return null;
  }
  return {
    ...user,
    roles: user.roles.map(({ role }) => role) as HasuraUserRole[],
    locale: user.locale as Locale,
    defaultRole: user.defaultRole as HasuraUserRole,
  };
};
