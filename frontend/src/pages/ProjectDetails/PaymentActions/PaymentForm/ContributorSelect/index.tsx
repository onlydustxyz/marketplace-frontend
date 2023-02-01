import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useIntl } from "src/hooks/useIntl";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import View from "./View";

const ContributorSelect = () => {
  const { T } = useIntl();
  const { setValue, setError, clearErrors } = useFormContext();
  const findUserQuery = useFindGithubUser();
  const location = useLocation();

  const defaultContributor = location.state?.recipientGithubLogin;

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

  const onContributorLoginChange = debounce(({ target }) => findUserQuery.trigger(target.value), 500);
  const validateContributorLogin = useCallback(
    () => !!findUserQuery.userId || T("github.invalidLogin"),
    [findUserQuery.userId]
  );

  return (
    <View
      loading={findUserQuery.loading}
      onContributorLoginChange={onContributorLoginChange}
      validateContributorLogin={validateContributorLogin}
    />
  );
};

export default ContributorSelect;
