import classNames from "classnames";
import { useForm, useWatch } from "react-hook-form";
import Input from "src/components/FormInput";
import FormToggle from "./FormToggle";
import MarkdownPreview from "src/components/MarkdownPreview";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  description: string;
  setDescription: (description: string) => void;
};

export default function Description({ description, setDescription }: Props) {
  const { T } = useIntl();
  const name = "other-work-description";
  const displayPreviewName = "display-preview";
  const { control } = useForm({ defaultValues: { [displayPreviewName]: false } });
  const displayPreview = useWatch({
    control,
    name: displayPreviewName,
  });

  return (
    <label htmlFor={name} className={classNames("flex flex-col flex-grow gap-2 text-greyscale-300 font-walsheim")}>
      <div className="flex items-center justify-between font-medium text-sm">
        <div className="tracking-tight">{T("payment.form.workItems.other.inputs.description")}</div>
        <FormToggle
          label={T("payment.form.workItems.other.toggleDescriptionPreview")}
          name={displayPreviewName}
          control={control}
        />
      </div>
      {displayPreview ? (
        <div className="w-full bg-white/5 border border-greyscale-50/[0.08] rounded-xl text-base px-4 py-3">
          <MarkdownPreview>{description}</MarkdownPreview>
        </div>
      ) : (
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
      )}
    </label>
  );
}
