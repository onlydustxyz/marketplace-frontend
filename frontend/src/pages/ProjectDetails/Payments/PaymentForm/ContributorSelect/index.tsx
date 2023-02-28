import { gql } from "@apollo/client";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import useFindGithubUser, { GITHUB_CONTRIBUTOR_FRAGMENT } from "src/hooks/useIsGithubLoginValid";
import { HasuraUserRole } from "src/types";
import { GetProjectContributorsForPaymentSelectQuery } from "src/__generated/graphql";
import View from "./View";
import { uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";

type Props = {
  projectId: string;
};

export default function ContributorSelect({ projectId }: Props) {
  const { T } = useIntl();
  const { setValue, setError, clearErrors, watch } = useFormContext();
  const findUserQuery = useFindGithubUser();
  const location = useLocation();

  const getProjectContributorsQuery = useHasuraQuery<GetProjectContributorsForPaymentSelectQuery>(
    GET_PROJECT_CONTRIBUTORS_QUERY,
    HasuraUserRole.Public,
    {
      variables: { projectId },
    }
  );

  const defaultContributor = location.state?.recipientGithubLogin;
  const onContributorHandleChange = useCallback((handle: string) => {
    setValue("contributorHandle", handle);
  }, []);
  const clear = useCallback(() => {
    setValue("contributorHandle", null);
    setValue("contributor", null);
  }, []);

  const contributorHandle = watch("contributorHandle");
  const contributor = watch("contributor");

  useEffect(() => {
    if (defaultContributor) {
      findUserQuery.trigger(defaultContributor);
      setValue("contributorHandle", defaultContributor);
    }
  }, [defaultContributor]);

  useEffect(() => {
    if (findUserQuery.user) {
      setValue("contributor", findUserQuery.user);
    }
  }, [findUserQuery.user]);

  useEffect(() => {
    if (findUserQuery.error && contributorHandle !== "") {
      setError("contributorHandle", { message: T("github.invalidLogin") });
      setValue("contributor", null);
    } else {
      clearErrors("contributorHandle");
    }
  }, [findUserQuery.error]);

  useEffect(() => {
    if (contributorHandle === "") {
      setValue("contributor", null);
    }
    if (contributorHandle !== null) {
      onContributorLoginChange(contributorHandle);
    }
  }, [contributorHandle]);

  const onContributorLoginChange = useMemo(() => debounce(handle => findUserQuery.trigger(handle), 500), []);
  const validateContributorLogin = useCallback(
    () => !!findUserQuery.user || T("github.invalidLogin"),
    [findUserQuery.user]
  );
  const contributors = useMemo(
    () =>
      uniqBy(
        getProjectContributorsQuery.data?.projectsByPk?.githubRepos
          .map(githubRepo => githubRepo?.githubRepoDetails?.content?.contributors)
          .filter(isDefined)
          .flat(),
        contributor => contributor?.id
      ),
    [getProjectContributorsQuery.data]
  );

  return (
    <View
      loading={findUserQuery.loading || getProjectContributorsQuery.loading}
      validateContributorLogin={validateContributorLogin}
      onContributorHandleChange={onContributorHandleChange}
      contributors={contributors ?? []}
      contributor={contributor}
      clear={clear}
    />
  );
}

export const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  ${GITHUB_CONTRIBUTOR_FRAGMENT}
  query GetProjectContributorsForPaymentSelect($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      githubRepos {
        githubRepoDetails {
          content {
            id
            contributors {
              ...GithubContributor
            }
          }
        }
      }
    }
  }
`;
