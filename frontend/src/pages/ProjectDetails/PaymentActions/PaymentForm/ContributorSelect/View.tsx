import { ChangeEventHandler, useCallback } from "react";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import { Contributor } from "src/pages/ProjectDetails/PaymentActions/PaymentForm/types";

type Props = {
  loading: boolean;
  onContributorHandleChange: (handle: string) => void;
  onContributorChange: (contributor: Contributor) => void;
  validateContributorLogin: () => boolean | string;
  contributors: { avatarUrl: string; login: string; id: number }[];
  contributor: Contributor;
};

const View = ({ loading, onContributorHandleChange, validateContributorLogin }: Props) => {
  const { T } = useIntl();
  const onHandleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      onContributorHandleChange(event.target.value);
    },
    [onContributorHandleChange]
  );

  return (
    <Input
      label={T("payment.form.contributor.inputLabel")}
      name="contributorHandle"
      placeholder={T("payment.form.contributor.placeholder")}
      options={{
        required: T("form.required"),
        validate: validateContributorLogin,
      }}
      onChange={onHandleChange}
      loading={loading}
    />
  );
};

export default View;
