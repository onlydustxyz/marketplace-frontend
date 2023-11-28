import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";
import Tag, { TagSize } from "../Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import Flex from "../Utils/Flex";

type FormStatusType = {
  isDirty?: boolean;
  isValid?: boolean;
};

export function FormStatus({ isDirty, isValid }: FormStatusType) {
  const { T } = useIntl();

  return (
    <Tag size={TagSize.Medium} testid="dirtyTag">
      {isDirty || !isValid ? (
        <Flex
          className={cn("items-center gap-1", {
            "text-orange-500": !isValid,
            "text-spacePurple-300": isValid,
          })}
        >
          <ErrorWarningLine />
          {isValid ? T("profile.form.saveStatus.unsaved") : T("project.details.edit.form.invalid")}
        </Flex>
      ) : (
        <Flex className="items-center gap-1">
          <CheckLine />
          {T("profile.form.saveStatus.saved")}
        </Flex>
      )}
    </Tag>
  );
}
