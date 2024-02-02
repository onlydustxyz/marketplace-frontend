import Telegram from "src/assets/icons/Telegram";
import ContactInformation from "src/components/ContactInformations/ContactInformation";
import { useIntl } from "src/hooks/useIntl";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

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

        <ContactInformation
          name="telegram"
          placeholder={T("profile.form.contactInfo.telegram")}
          icon={<Telegram size={16} className="fill-greyscale-400" />}
          visibilityName="isTelegramPublic"
          options={{
            pattern: {
              value: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
              message: T("profile.form.contactInfo.invalidUsername"),
            },
          }}
        />
      </Flex>
    </Card>
  );
}
