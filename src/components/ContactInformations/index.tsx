import Telegram from "src/assets/icons/Telegram";
import { useIntl } from "src/hooks/useIntl";

import { Icon } from "components/layout/icon/icon";

import ContactInformation from "./ContactInformation";

type Props = {
  onlyEditable?: boolean;
};

export default function ContactInformations({ onlyEditable }: Props) {
  const { T } = useIntl();

  return (
    <div className="flex flex-col gap-3">
      {!onlyEditable && (
        <>
          <ContactInformation
            name="login"
            icon={<Icon remixName="ri-github-fill" className="text-greyscale-600" />}
            editDisabled
            visibilityName="isGithubHandlePublic"
            visibilityDisabled
          />
          <ContactInformation
            name="email"
            icon={<Icon remixName="ri-mail-line" className="text-greyscale-600" />}
            editDisabled
            visibilityName="isEmailPublic"
          />
        </>
      )}
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
      <ContactInformation
        name="whatsapp"
        placeholder={T("profile.form.contactInfo.whatsapp")}
        icon={<Icon remixName="ri-whatsapp-fill" />}
        visibilityName="isWhatsappPublic"
        options={{
          pattern: {
            value: /^\+?(?:[0-9-(). ])*$/,
            message: T("profile.form.contactInfo.invalidePhoneNumber"),
          },
        }}
      />
      <ContactInformation
        name="twitter"
        placeholder={T("profile.form.contactInfo.twitter")}
        icon={<Icon remixName="ri-twitter-x-fill" />}
        visibilityName="isTwitterPublic"
        options={{
          pattern: {
            value: /^(?:@|(?:(?:(?:https?:\/\/)?(?:twitter)?)\.com\/))?(\w*)$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
      <ContactInformation
        name="discord"
        placeholder={T("profile.form.contactInfo.discord")}
        icon={<Icon remixName="ri-discord-fill" />}
        visibilityName="isDiscordPublic"
        options={{
          pattern: {
            value: /^@?[a-zA-Z0-9_.]*$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
      <ContactInformation
        name="linkedin"
        placeholder={T("profile.form.contactInfo.linkedin")}
        icon={<Icon remixName="ri-linkedin-box-fill" />}
        visibilityName="isLinkedInPublic"
        options={{
          pattern: {
            value: /^(?:@|(?:(?:(?:https?:)?\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/))?([\w\-_À-ÿ%]*)\/?$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
    </div>
  );
}
