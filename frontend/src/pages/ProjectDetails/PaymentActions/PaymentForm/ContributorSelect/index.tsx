import { gql } from "@apollo/client";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import { HasuraUserRole } from "src/types";
import { GetProjectContributorsForPaymentSelectQuery } from "src/__generated/graphql";
import View from "./View";

type Props = {
  projectId: string;
};

const ContributorSelect = ({ projectId }: Props) => {
  const { T } = useIntl();
  const { setValue, setError, clearErrors, watch, register } = useFormContext();
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

  const contributorHandle = watch("contributorHandle");

  useEffect(() => {
    if (defaultContributor) {
      findUserQuery.trigger(defaultContributor);
      setValue("contributorHandle", defaultContributor);
    }
  }, [defaultContributor]);

  useEffect(() => {
    if (findUserQuery.userId) {
      setValue("contributorId", findUserQuery.userId);
    }
  }, [findUserQuery.userId]);

  useEffect(() => {
    if (findUserQuery.error) {
      setError("contributorHandle", { message: T("github.invalidLogin") });
    } else {
      clearErrors("contributorHandle");
    }
  }, [findUserQuery.error]);

  useEffect(() => {
    if (contributorHandle) {
      onContributorLoginChange(contributorHandle);
    }
  }, [contributorHandle]);

  const onContributorLoginChange = useMemo(() => debounce(handle => findUserQuery.trigger(handle), 500), []);
  const validateContributorLogin = useCallback(
    () => !!findUserQuery.userId || T("github.invalidLogin"),
    [findUserQuery.userId]
  );
  const contributors = useMemo(
    () => getProjectContributorsQuery.data?.projectsByPk?.githubRepo?.content?.contributors ?? [],
    [getProjectContributorsQuery.data]
  );

  return (
    <View
      loading={findUserQuery.loading || getProjectContributorsQuery.loading}
      validateContributorLogin={validateContributorLogin}
      onChange={register("contributorHandle").onChange}
      contributors={contributors}
    />
  );
};

export default ContributorSelect;

const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  query GetProjectContributorsForPaymentSelect($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      githubRepo {
        content {
          contributors {
            avatarUrl
            id
            login
          }
        }
      }
    }
  }
`;
