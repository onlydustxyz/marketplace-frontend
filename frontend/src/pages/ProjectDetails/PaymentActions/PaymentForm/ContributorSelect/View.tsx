import { ChangeEventHandler } from "react";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  loading: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  validateContributorLogin: () => boolean | string;
};

const View = ({ loading, onChange, validateContributorLogin }: Props) => {
  const { T } = useIntl();

  return (
    <Input
      label={T("payment.form.contributor.inputLabel")}
      name="contributorHandle"
      placeholder={T("payment.form.contributor.placeholder")}
      options={{
        required: T("form.required"),
        validate: validateContributorLogin,
      }}
      onChange={onChange}
      loading={loading}
    />
  );
};

export default View;
