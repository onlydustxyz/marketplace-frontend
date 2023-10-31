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
  const onSubmitting: SubmitHandler<FormValues> = (data) => onSubmit(data.password);

  const password = watch("password");
  const isPasswordEmpty = !password || password.length === 0;

  return (
    <div className="w-96">
      <Card>
        <form onSubmit={handleSubmit(onSubmitting)} className="flex flex-col gap-4">
          <h1 className="text-center text-lg font-bold text-orange-500">{T("impersonation.form.title")}</h1>
          <i className="text-sm text-spaceBlue-200">{T("impersonation.form.notice")}</i>
          <label htmlFor="password" className="font-walsheim text-greyscale-300 text-sm font-medium tracking-tight">{T("impersonation.form.password.label")}</label>
          <input 
            type="password" 
            {...register("password", { required: true })} 
            className="w-full bg-white/5 rounded-xl font-walsheim font-normal text-greyscale-50 border border-greyscale-50/[0.08] placeholder:text-spaceBlue-200 focus:placeholder:text-spacePurple-200/60 focus:border-spacePurple-500 focus:bg-spacePurple-900 h-11 px-4 py-3 text-base focus:outline-none focus:ring-none"
          />
          {isPasswordEmpty && (
            <span className="text-red-500 text-sm">{T("impersonation.form.password.missing")}</span>
          )}
        </form>
      </Card>
    </div>
  );
};

export default PasswordForm;
