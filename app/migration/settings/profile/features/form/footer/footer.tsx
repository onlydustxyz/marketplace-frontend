import { useAuth0 } from "@auth0/auth0-react";
import { useFormContext } from "react-hook-form";
import { generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";
import { Spinner } from "src/components/Spinner/Spinner";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TFormFooter } from "./footer.types";

// TODO: Change Button with link using the new library
export function FormFooter({ userProfilInformationIsPending }: TFormFooter.Props) {
  const { user } = useAuth0();

  const { formState } = useFormContext();
  const { isDirty, isValid } = formState;

  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      className="-mx-4 -mb-6 border-t border-greyscale-50/8 bg-spaceBlue-900 px-8 py-5 shadow-medium xl:-mx-8"
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

      <Flex alignItems="center" className="gap-5">
        <a
          href={generatePath(RoutePaths.PublicProfile, {
            userLogin: user?.nickname || "",
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary">
            <Icon remixName="ri-external-link-line" size={20} />
            <Translate token="v2.pages.settings.publicProfile.buttons.preview" />
          </Button>
        </a>

        <Button type="submit" disabled={userProfilInformationIsPending || !isValid}>
          {userProfilInformationIsPending ? (
            <Spinner className="h-5 w-5" />
          ) : (
            <Icon remixName="ri-check-line" size={20} />
          )}
          <Translate token="v2.pages.settings.publicProfile.buttons.save" />
        </Button>
      </Flex>
    </Flex>
  );
}
