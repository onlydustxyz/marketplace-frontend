import { cn } from "src/utils/cn";
import { useForm, useWatch } from "react-hook-form";
import Input from "src/components/FormInput";
import FormToggle from "src/components/FormToggle";
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
    <label htmlFor={name} className={cn("flex flex-grow flex-col gap-2 font-walsheim text-greyscale-300")}>
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="tracking-tight">{T("reward.form.contributions.other.inputs.description")}</div>
        <FormToggle
          label={T("reward.form.contributions.other.toggleDescriptionPreview")}
          name={displayPreviewName}
          control={control}
        />
      </div>
      {displayPreview ? (
        <div className="w-full rounded-xl border border-greyscale-50/[0.08] bg-white/5 px-4 py-3 text-base">
          <MarkdownPreview>{description}</MarkdownPreview>
        </div>
      ) : (
        <Input
          name="other-work-description"
          placeholder={T("reward.form.contributions.other.issue.descriptionPlaceholder")}
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
