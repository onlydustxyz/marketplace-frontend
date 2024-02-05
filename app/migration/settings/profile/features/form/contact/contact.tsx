import Telegram from "src/assets/icons/Telegram";
import ContactInformation from "src/components/ContactInformations/ContactInformation";
import { useIntl } from "src/hooks/useIntl";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

// TODO: Review design component + sanitize value
export function FormContact() {
  const { T } = useIntl();

  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography variant="title-s" translate={{ token: "v2.pages.settings.publicProfile.contact.title" }} />

          <Typography
            variant="body-s"
            translate={{ token: "v2.pages.settings.publicProfile.contact.subtitle" }}
            className="text-spaceBlue-200"
          />
        </Flex>

        <Flex direction="col" className="gap-3">
          <ContactInformation
            name="telegram.contact"
            placeholder={T("profile.form.contactInfo.telegram")}
            icon={<Telegram size={16} className="fill-greyscale-400" />}
            visibilityName="telegram.isPublic"
            options={{
              pattern: {
                value: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
                message: T("profile.form.contactInfo.invalidUsername"),
              },
            }}
          />

          <ContactInformation
            name="whatsapp.contact"
            placeholder={T("profile.form.contactInfo.whatsapp")}
            icon={<Icon remixName="ri-whatsapp-fill" />}
            visibilityName="whatsapp.isPublic"
            options={{
              pattern: {
                value: /^\+?(?:[0-9-(). ])*$/,
                message: T("profile.form.contactInfo.invalidePhoneNumber"),
              },
            }}
          />

          <ContactInformation
            name="twitter.contact"
            placeholder={T("profile.form.contactInfo.twitter")}
            icon={<Icon remixName="ri-twitter-x-fill" />}
            visibilityName="twitter.isPublic"
            options={{
              pattern: {
                value: /^(?:@|(?:(?:(?:https?:\/\/)?(?:twitter)?)\.com\/))?(\w*)$/,
                message: T("profile.form.contactInfo.invalidUsername"),
              },
            }}
          />

          <ContactInformation
            name="discord.contact"
            placeholder={T("profile.form.contactInfo.discord")}
            icon={<Icon remixName="ri-discord-fill" />}
            visibilityName="discord.isPublic"
            options={{
              pattern: {
                value: /^@?[a-zA-Z0-9_.]*$/,
                message: T("profile.form.contactInfo.invalidUsername"),
              },
            }}
          />

          <ContactInformation
            name="linkedin.contact"
            placeholder={T("profile.form.contactInfo.linkedin")}
            icon={<Icon remixName="ri-linkedin-box-fill" />}
            visibilityName="linkedin.isPublic"
            options={{
              pattern: {
                value: /^(?:@|(?:(?:(?:https?:)?\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/))?([\w\-_À-ÿ%]*)\/?$/,
                message: T("profile.form.contactInfo.invalidUsername"),
              },
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
