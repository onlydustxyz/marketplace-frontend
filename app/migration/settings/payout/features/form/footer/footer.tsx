import { useFormContext } from "react-hook-form";

import { Spinner } from "src/components/Spinner/Spinner";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TFormFooter } from "./footer.types";

export function FormFooter({ isPending }: TFormFooter.Props) {
  const { formState } = useFormContext();
  const { isDirty, isValid } = formState;

  return (
    <Flex
      alignItems="center"
      className="-mx-4 -mb-6 flex-col gap-4 border-t border-greyscale-50/8 bg-spaceBlue-900 px-8 py-5 shadow-medium md:flex-row md:justify-between xl:-mx-8"
    >
      <Tag size="medium">
        {isDirty || !isValid ? (
          <Flex
            alignItems="center"
            className={cn("gap-1", {
              "text-orange-500": !isValid,
              "text-spacePurple-300": isValid,
            })}
          >
            <Icon remixName="ri-error-warning-line" />

            <Typography variant="body-s">
              {isValid ? (
                <Translate token="v2.commons.form.status.unsaved" />
              ) : (
                <Translate token="v2.commons.form.status.invalid" />
              )}
            </Typography>
          </Flex>
        ) : (
          <>
            <Icon remixName="ri-check-line" />
            <Translate token="v2.commons.form.status.saved" />
          </>
        )}
      </Tag>

      <Button type="submit" disabled={isPending || !isValid} className="w-full md:w-auto">
        {isPending ? <Spinner className="h-5 w-5" /> : <Icon remixName="ri-check-line" size={20} />}
        <Translate token="v2.commons.form.buttons.save" />
      </Button>
    </Flex>
  );
}
