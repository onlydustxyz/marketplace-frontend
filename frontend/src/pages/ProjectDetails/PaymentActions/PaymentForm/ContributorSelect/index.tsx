import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useIntl } from "src/hooks/useIntl";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import View from "./View";

type Props = {
  projectId: string;
};

const ContributorSelect = ({ projectId }: Props) => {
  const { T } = useIntl();
  const { setValue, setError, clearErrors, watch, register } = useFormContext();
  const findUserQuery = useFindGithubUser();
  const location = useLocation();

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

  return (
    <View
      loading={findUserQuery.loading}
      validateContributorLogin={validateContributorLogin}
      onChange={register("contributorHandle").onChange}
    />
  );
};

export default ContributorSelect;
