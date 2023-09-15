import { useEffect } from "react";
import { ImpersonatedUserQuery, useImpersonatedUserQuery } from "src/__generated/graphql";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { CustomUserRole, HasuraUserRole, Locale, TokenSetUser } from "src/types";

export const useImpersonation = () => {
  const { impersonationSet, clearImpersonationSet, setCustomClaims } = useImpersonationClaims();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const impersonatedUserQuery = useImpersonatedUserQuery({
    context: {
      graphqlErrorDisplay: "none",
      headers: { "X-Hasura-Role": "admin" },
    },
    variables: {
      id: impersonationSet?.userId,
    },
    skip: !impersonationSet,
    onCompleted(data) {
      if (!data.user || !data.user.registeredUser?.login) {
        showToaster(T("impersonation.form.errors.unknownUser", { userId: impersonationSet?.userId }), {
          isError: true,
        });
        clearImpersonationSet();
      }
    },
    onError(error) {
      showToaster(error.message, {
        isError: true,
      });
      clearImpersonationSet();
    },
  });
  const impersonating = !!impersonatedUserQuery.data;

  const invalidImpersonation = !!impersonatedUserQuery.error;

  const impersonatedUser = impersonatedUserQuery.data?.user
    ? mapImpersonatedUser(impersonatedUserQuery.data.user)
    : null;

  const impersonatedGithubUserId = impersonatedUserQuery.data?.user?.registeredUser?.githubUserId as number | undefined;
  const impersonatedLedProjectIds: string[] =
    impersonatedUserQuery.data?.user?.registeredUser?.projectsLeaded.map(l => l.projectId) || [];
  const impersonatedGithubAccessToken = impersonatedUserQuery.data?.user?.userGithubProvider?.accessToken || undefined;

  const impersonatedRoles =
    impersonatedLedProjectIds.length > 0
      ? [HasuraUserRole.RegisteredUser, CustomUserRole.ProjectLead]
      : [HasuraUserRole.RegisteredUser];

  useEffect(() => {
    if (impersonatedGithubUserId === undefined) {
      return;
    }
    setCustomClaims({
      githubUserId: impersonatedGithubUserId,
      projectsLeaded: impersonatedLedProjectIds,
      githubAccessToken: impersonatedGithubAccessToken,
    });
  }, [impersonatedLedProjectIds, impersonatedGithubUserId]);

  return {
    impersonating,
    invalidImpersonation,
    impersonatedRoles,
    impersonatedUser,
    impersonatedGithubUserId,
    impersonatedLedProjectIds,
    stopImpersonation: clearImpersonationSet,
  };
};

const mapImpersonatedUser = (user: ImpersonatedUserQuery["user"]): TokenSetUser | null => {
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
