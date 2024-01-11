import { useForm, SubmitHandler } from "react-hook-form";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  onSubmit: (password: string) => void;
};

type FormValues = {
  password: string;
};

const PasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const { T } = useIntl();
  const onSubmitting: SubmitHandler<FormValues> = data => onSubmit(data.password);

  const password = watch("password");
  const isPasswordEmpty = !password || password.length === 0;

  return (
    <div className="w-96">
      <Card>
        <form onSubmit={handleSubmit(onSubmitting)} className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-bold text-orange-500">{T("impersonation.form.title")}</h1>
          <i className="text-sm text-spaceBlue-200">{T("impersonation.form.notice")}</i>
          <label htmlFor="password" className="font-walsheim text-sm font-medium tracking-tight text-greyscale-300">
            {T("impersonation.form.password.label")}
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="focus:ring-none h-11 w-full rounded-xl border border-greyscale-50/[0.08] bg-white/5 px-4 py-3 font-walsheim text-base font-normal text-greyscale-50 placeholder:text-spaceBlue-200 focus:border-spacePurple-500 focus:bg-spacePurple-900 focus:outline-none focus:placeholder:text-spacePurple-200/60"
          />
          {isPasswordEmpty && <span className="text-sm text-red-500">{T("impersonation.form.password.missing")}</span>}
        </form>
      </Card>
    </div>
  );
};

export default PasswordForm;
