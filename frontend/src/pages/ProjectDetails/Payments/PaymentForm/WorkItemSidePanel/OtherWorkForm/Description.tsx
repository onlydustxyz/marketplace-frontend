import classNames from "classnames";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  description: string;
  setDescription: (description: string) => void;
};

export default function Description({ description, setDescription }: Props) {
  const { T } = useIntl();

  return (
    <textarea
      data-testid="other-work-description"
      placeholder={T("payment.form.workItems.other.issue.descriptionPlaceholder")}
      className={classNames(
        "w-full py-3 px-4 h-36 resize-none",
        "border border-greyscale-50/8 outline-none rounded-xl bg-white/5",
        "font-walsheim font-normal text-base text-greyscale-50 placeholder:text-greyscale-500",
        "scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
      )}
      value={description}
      onChange={({ target }) => setDescription(target.value)}
    />
  );
}
