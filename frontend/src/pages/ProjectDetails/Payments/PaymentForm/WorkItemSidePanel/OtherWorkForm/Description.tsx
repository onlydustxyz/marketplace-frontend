import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  description: string;
  setDescription: (description: string) => void;
};

export default function Description({ description, setDescription }: Props) {
  const { T } = useIntl();

  return (
    <Input
      name="other-work-description"
      label={T("payment.form.workItems.other.inputs.description")}
      placeholder={T("payment.form.workItems.other.issue.descriptionPlaceholder")}
      value={description}
      onChange={({ target }) => setDescription(target.value)}
      as="textarea"
      inputProps={{
        rows: 5,
      }}
    />
  );
}
