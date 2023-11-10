import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";
import Tag, { TagSize } from "../Tag";
import { useIntl } from "src/hooks/useIntl";

type FormStatusType = {
  isDirty?: boolean;
  isValid?: boolean;
};

export function FormStatus({ isDirty, isValid }: FormStatusType) {
  const { T } = useIntl();

  return (
    <Tag size={TagSize.Medium} testid="dirtyTag">
      {isDirty || !isValid ? (
        <div
          className={cn("flex flex-row items-center gap-1", {
            "text-orange-500": !isValid,
            "text-spacePurple-300": isValid,
          })}
        >
          <ErrorWarningLine />
          {isValid ? T("profile.form.saveStatus.unsaved") : T("profile.form.saveStatus.invalid")}
        </div>
      ) : (
        <>
          <CheckLine />
          {T("profile.form.saveStatus.saved")}
        </>
      )}
    </Tag>
  );
}
