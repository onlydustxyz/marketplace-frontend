import classNames from "classnames";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  description: string;
  setDescription: (description: string) => void;
};

export default function Description({ description, setDescription }: Props) {
  const { T } = useIntl();
  const name = "other-work-description";

  return (
    <label htmlFor={name} className={classNames("flex flex-col flex-grow gap-2 text-greyscale-300 font-walsheim")}>
      <div className="font-medium text-sm tracking-tight">{T("payment.form.workItems.other.inputs.description")}</div>
      <Input
        name="other-work-description"
        placeholder={T("payment.form.workItems.other.issue.descriptionPlaceholder")}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        as="textarea"
        inputProps={{
          rows: 5,
        }}
      />
    </label>
  );
}
