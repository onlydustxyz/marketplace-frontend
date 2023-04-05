import { gql } from "@apollo/client";
import { ImpersonatedUserQuery } from "src/__generated/graphql";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useTokenSet } from "src/hooks/useTokenSet";
import { HasuraUserRole, Locale, User } from "src/types";

export const useImpersonation = () => {
  const { impersonationSet, clearImpersonationSet } = useTokenSet();
  const impersonating = !!impersonationSet;

  const impersonatedUserQuery = useHasuraQuery<ImpersonatedUserQuery>(IMPERSONATED_USER_QUERY, HasuraUserRole.Admin, {
    variables: {
      id: impersonationSet?.userId,
    },
    skip: !impersonating,
  });

  const impersonatedUser = impersonatedUserQuery.data?.user
    ? mapImpersonatedUser(impersonatedUserQuery.data.user)
    : null;

  const impersonatedRoles = [HasuraUserRole.RegisteredUser];

  const impersonatedGithubUserId = impersonatedUserQuery.data?.user?.githubUser?.githubUserId as number | undefined;

  return {
    impersonating,
    impersonatedRoles,
    impersonatedUser,
    impersonatedGithubUserId,
    stopImpersonation: clearImpersonationSet,
  };
};

export const IMPERSONATED_USER_QUERY = gql`
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
