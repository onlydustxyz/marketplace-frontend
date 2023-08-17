import { useIntl } from "src/hooks/useIntl";

import GithubLogo from "src/icons/GithubLogo";
import Telegram from "src/assets/icons/Telegram";
import TwitterFill from "src/icons/TwitterFill";
import DiscordFill from "src/icons/DiscordFill";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import MailLine from "src/icons/MailLine";
import ContactInformation from "./ContactInformation";
import WhatsappFill from "src/icons/WhatsappFill";

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
            name="githubHandle"
            icon={<GithubLogo className="text-greyscale-600" />}
            editDisabled
            visibilityName="isGithubHandlePublic"
            visibilityDisabled
          />
          <ContactInformation
            name="email"
            icon={<MailLine className="text-greyscale-600" />}
            editDisabled
            visibilityName="isEmailPublic"
          />
        </>
      )}
      <ContactInformation
        name="telegram"
        placeholder={T("profile.form.contactInfo.telegram")}
        icon={<Telegram size={16} />}
        visibilityName="isTelegramPublic"
        options={{
          pattern: {
            value: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w{4,})$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
      <ContactInformation
        name="whatsapp"
        placeholder={T("profile.form.contactInfo.whatsapp")}
        icon={<WhatsappFill />}
        visibilityName="isWhatsappPublic"
        options={{
          pattern: {
            value: /^\+?(?:[0-9-(). ])+$/,
            message: T("profile.form.contactInfo.invalidePhoneNumber"),
          },
        }}
      />
      <ContactInformation
        name="twitter"
        placeholder={T("profile.form.contactInfo.twitter")}
        icon={<TwitterFill />}
        visibilityName="isTwitterPublic"
        options={{
          pattern: {
            value: /^(?:@|(?:(?:(?:https?:\/\/)?(?:twitter)?)\.com\/))?(\w{4,})$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
      <ContactInformation
        name="discord"
        placeholder={T("profile.form.contactInfo.discord")}
        icon={<DiscordFill />}
        visibilityName="isDiscordPublic"
        options={{
          pattern: {
            value: /^@?[a-zA-Z0-9_.]{2,32}$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
      <ContactInformation
        name="linkedin"
        placeholder={T("profile.form.contactInfo.linkedin")}
        icon={<LinkedinBoxFill />}
        visibilityName="isLinkedInPublic"
        options={{
          pattern: {
            value: /^(?:@|(?:(?:(?:https?:)?\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/))?([\w\-_À-ÿ%]+)\/?$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
    </div>
  );
}
