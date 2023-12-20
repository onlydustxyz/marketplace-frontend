import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  defaultTitle: string;
  title: string;
  setTitle: (title: string) => void;
};

export default function Title({ defaultTitle, title, setTitle }: Props) {
  const { T } = useIntl();

  return (
    <Input
      label={T("reward.form.contributions.other.inputs.title")}
      name="other-work-title"
      value={title}
      placeholder={defaultTitle}
      onChange={({ target }) => setTitle(target.value)}
      withMargin={false}
    />
  );
}
