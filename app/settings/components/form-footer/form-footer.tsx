import { useAuth0 } from "@auth0/auth0-react";
import { useFormContext } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import { Spinner } from "src/components/Spinner/Spinner";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Tag } from "components/ds/tag/tag";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TFormFooter } from "./form-footer.types";

export function FormFooter({ isPending, hasPreviewButton, isAbsolute = true }: TFormFooter.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const { user } = useAuth0();

  const { formState } = useFormContext();
  const { isDirty, isValid, errors } = formState;

  console.log("isDirty", isDirty);
  console.log("isValid", isValid, errors);

  function renderIcon() {
    if (!isMd) return null;

    if (isPending) {
      return <Spinner className="h-5 w-5" />;
    }

    return <Icon remixName="ri-check-line" size={20} />;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={cn("border-t border-greyscale-50/8", {
        "absolute bottom-0 left-0 right-0 z-50 bg-spaceBlue-900 p-4 shadow-medium xl:px-8": isAbsolute,
        "mt-5 pt-5": !isAbsolute,
      })}
    >
      <div className={cn("w-full", { "max-w-7xl px-0 xl:px-8": isAbsolute })}>
        <Flex alignItems="center" justifyContent="between" className="flex-col gap-4 md:flex-row md:gap-2">
          <Tag size="medium" className="w-full md:w-fit" containerClassName="w-full md:w-fit">
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

          <Flex alignItems="center" className="w-full gap-3 md:w-fit">
            {hasPreviewButton ? (
              <BaseLink
                href={NEXT_ROUTER.publicProfile.root(user?.nickname ?? "")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-fit"
              >
                <Button variant="secondary" size={isMd ? "m" : "s"} className="w-full md:w-fit">
                  <Icon remixName="ri-external-link-line" size={20} />

                  {isMd ? (
                    <Translate token="v2.pages.settings.profile.buttons.preview" />
                  ) : (
                    <Translate token="v2.pages.settings.profile.buttons.previewMobile" />
                  )}
                </Button>
              </BaseLink>
            ) : null}

            <Button
              type="submit"
              disabled={isPending || !isValid || !isDirty}
              size={isMd ? "m" : "s"}
              backgroundColor={"blue"}
              className="w-full md:w-fit"
            >
              {renderIcon()}

              {isMd ? (
                <Translate token="v2.commons.form.buttons.save" />
              ) : (
                <Translate token="v2.commons.form.buttons.saveMobile" />
              )}
            </Button>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
}
