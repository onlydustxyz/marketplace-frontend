import { gql } from "@apollo/client";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import { Contributor } from "src/pages/ProjectDetails/PaymentActions/PaymentForm/types";
import { HasuraUserRole } from "src/types";
import { GetProjectContributorsForPaymentSelectQuery } from "src/__generated/graphql";
import View from "./View";

type Props = {
  projectId: string;
};

const ContributorSelect = ({ projectId }: Props) => {
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
  const onContributorChange = useCallback((contributor: Contributor) => {
    setValue("contributor", contributor);
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
    () => !!findUserQuery.user || T("github.invalidLogin"),
    [findUserQuery.user]
  );
  const contributors = useMemo(
    () => getProjectContributorsQuery.data?.projectsByPk?.githubRepo?.content?.contributors ?? [],
    [getProjectContributorsQuery.data]
  );

  return (
    <View
      loading={findUserQuery.loading || getProjectContributorsQuery.loading}
      validateContributorLogin={validateContributorLogin}
      onContributorHandleChange={onContributorHandleChange}
      onContributorChange={onContributorChange}
      contributors={contributors}
      contributor={contributor}
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
