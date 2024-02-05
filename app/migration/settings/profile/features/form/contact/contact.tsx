import Telegram from "src/assets/icons/Telegram";
import ContactInformation from "src/components/ContactInformations/ContactInformation";
import { useIntl } from "src/hooks/useIntl";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { REGEX } from "../form.regex";

export function FormContact() {
  const { T } = useIntl();

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
          <ContactInformation
            name="telegram.contact"
            errorName="telegram"
            placeholder={T("v2.commons.form.contact.telegram.placeholder")}
            icon={<Telegram size={16} className="fill-greyscale-400" />}
            visibilityName="telegram.isPublic"
            options={{
              pattern: {
                value: REGEX.telegram,
                message: T("v2.commons.form.errors.invalidUsername"),
              },
            }}
          />

          <ContactInformation
            name="whatsapp.contact"
            errorName="whatsapp"
            placeholder={T("v2.commons.form.contact.whatsapp.placeholder")}
            icon={<Icon remixName="ri-whatsapp-fill" />}
            visibilityName="whatsapp.isPublic"
            options={{
              pattern: {
                value: REGEX.whatsapp,
                message: T("v2.commons.form.errors.invalidePhoneNumber"),
              },
            }}
          />

          <ContactInformation
            name="twitter.contact"
            errorName="twitter"
            placeholder={T("v2.commons.form.contact.twitter.placeholder")}
            icon={<Icon remixName="ri-twitter-x-fill" />}
            visibilityName="twitter.isPublic"
            options={{
              pattern: {
                value: REGEX.twitter,
                message: T("v2.commons.form.errors.invalidUsername"),
              },
            }}
          />

          <ContactInformation
            name="discord.contact"
            errorName="discord"
            placeholder={T("v2.commons.form.contact.discord.placeholder")}
            icon={<Icon remixName="ri-discord-fill" />}
            visibilityName="discord.isPublic"
            options={{
              pattern: {
                value: REGEX.discord,
                message: T("v2.commons.form.errors.invalidUsername"),
              },
            }}
          />

          <ContactInformation
            name="linkedin.contact"
            errorName="linkedin"
            placeholder={T("v2.commons.form.contact.linkedin.placeholder")}
            icon={<Icon remixName="ri-linkedin-box-fill" />}
            visibilityName="linkedin.isPublic"
            options={{
              pattern: {
                value: REGEX.linkedin,
                message: T("v2.commons.form.errors.invalidUsername"),
              },
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
