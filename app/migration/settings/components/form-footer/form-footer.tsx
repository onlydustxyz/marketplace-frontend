import { useAuth0 } from "@auth0/auth0-react";
import { useFormContext } from "react-hook-form";
import { generatePath } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { RoutePaths } from "src/App";
import { Spinner } from "src/components/Spinner/Spinner";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TFormFooter } from "./form-footer.types";

// TODO: Change Button with link using the new library
export function FormFooter({ isPending, hasPreviewButton }: TFormFooter.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const { user } = useAuth0();

  const { formState } = useFormContext();
  const { isDirty, isValid } = formState;

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
      className="absolute bottom-0 left-0 right-0 z-50 border-t border-greyscale-50/8 bg-spaceBlue-900 px-8 py-5 shadow-medium"
    >
      <div className="w-full max-w-7xl px-4 xl:px-8">
        <Flex alignItems="center" justifyContent="between">
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

          <Flex alignItems="center" className="gap-3">
            {hasPreviewButton ? (
              <a
                href={generatePath(RoutePaths.PublicProfile, {
                  userLogin: user?.nickname || "",
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size={isMd ? "m" : "s"}>
                  {isMd ? <Icon remixName="ri-external-link-line" size={20} /> : null}

                  {isMd ? (
                    <Translate token="v2.pages.settings.profile.buttons.preview" />
                  ) : (
                    <Translate token="v2.pages.settings.profile.buttons.previewMobile" />
                  )}
                </Button>
              </a>
            ) : null}

            <Button type="submit" disabled={isPending || !isValid} size={isMd ? "m" : "s"}>
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
