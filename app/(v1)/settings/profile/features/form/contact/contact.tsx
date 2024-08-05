import { Controller, useFormContext } from "react-hook-form";

import { Card } from "components/ds/card/card";
import { ContactInput } from "components/ds/form/contact-input/contact-input";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function FormContact() {
  const { T } = useIntl();
  const { control } = useFormContext();

  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography variant="title-s" translate={{ token: "v2.pages.settings.profile.contact.title" }} />

          <Typography
            variant="body-s"
            translate={{ token: "v2.pages.settings.profile.contact.subtitle" }}
            className="text-spaceBlue-200"
          />
        </Flex>

        <Flex direction="col" className="gap-3">
          <Controller
            name="telegram.contact"
            control={control}
            render={({ field, fieldState }) => (
              <ContactInput
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
                placeholder={T("v2.commons.form.contact.telegram.placeholder")}
                startContent={<Icon remixName="ri-telegram-2-fill" />}
                visibilityName="telegram.isPublic"
              />
            )}
          />

          <Controller
            name="whatsapp.contact"
            control={control}
            render={({ field, fieldState }) => (
              <ContactInput
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
                placeholder={T("v2.commons.form.contact.whatsapp.placeholder")}
                startContent={<Icon remixName="ri-whatsapp-fill" />}
                visibilityName="whatsapp.isPublic"
              />
            )}
          />

          <Controller
            name="twitter.contact"
            control={control}
            render={({ field, fieldState }) => (
              <ContactInput
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
                placeholder={T("v2.commons.form.contact.twitter.placeholder")}
                startContent={<Icon remixName="ri-twitter-x-fill" />}
                visibilityName="twitter.isPublic"
              />
            )}
          />

          <Controller
            name="discord.contact"
            control={control}
            render={({ field, fieldState }) => (
              <ContactInput
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
                placeholder={T("v2.commons.form.contact.discord.placeholder")}
                startContent={<Icon remixName="ri-discord-fill" />}
                visibilityName="discord.isPublic"
              />
            )}
          />

          <Controller
            name="linkedin.contact"
            control={control}
            render={({ field, fieldState }) => (
              <ContactInput
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
                placeholder={T("v2.commons.form.contact.linkedin.placeholder")}
                startContent={<Icon remixName="ri-linkedin-box-fill" />}
                visibilityName="linkedin.isPublic"
              />
            )}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
