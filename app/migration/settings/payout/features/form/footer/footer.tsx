import { useFormContext } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import { Spinner } from "src/components/Spinner/Spinner";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TFormFooter } from "./footer.types";

export function FormFooter({ isPending }: TFormFooter.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const { formState } = useFormContext();
  const { isDirty, isValid } = formState;

  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      className="-mx-4 -mb-6 gap-4 border-t border-greyscale-50/8 bg-spaceBlue-900 px-8 py-5 shadow-medium xl:-mx-8"
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

      <Button type="submit" disabled={isPending || !isValid} size={isMd ? "m" : "s"}>
        {isMd ? isPending ? <Spinner className="h-5 w-5" /> : <Icon remixName="ri-check-line" size={20} /> : null}

        <Translate token={isMd ? "v2.commons.form.buttons.save" : "v2.commons.form.buttons.saveMobile"} />
      </Button>
    </Flex>
  );
}
