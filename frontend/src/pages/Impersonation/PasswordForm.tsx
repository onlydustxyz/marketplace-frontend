import { FormProvider, useForm } from "react-hook-form";
import Card from "src/components/Card";
import FormInput from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  onSubmit: (password: string) => void;
};

const PasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const methods = useForm({ defaultValues: { password: "" } });
  const password = methods.watch("password");
  const { T } = useIntl();

  return (
    <div className="w-96">
      <Card>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(({ password }) => onSubmit(password))} className="flex flex-col gap-4">
            <h1 className="text-center font-bold text-orange-500 text-lg">{T("impersonation.form.title")}</h1>
            <i className="text-sm text-spaceBlue-200">{T("impersonation.form.notice")}</i>
            <FormInput
              name="password"
              label={T("impersonation.form.password.label")}
              type="password"
              options={{
                required: { value: password.length === 0, message: T("impersonation.form.password.missing") },
              }}
              withMargin={false}
            />
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default PasswordForm;
