import { useIntl } from "src/hooks/useIntl";

import GithubLogo from "src/icons/GithubLogo";
import Telegram from "src/assets/icons/Telegram";
import TwitterFill from "src/icons/TwitterFill";
import DiscordFill from "src/icons/DiscordFill";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import MailLine from "src/icons/MailLine";
import ContactInformation from "./ContactInformation";
import WhatsappFill from "src/icons/WhatsappFill";

export default function ContactInformations() {
  const { T } = useIntl();

  return (
    <div className="flex flex-col gap-3">
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
      <ContactInformation
        name="telegram"
        placeholder={T("profile.form.contactInfo.telegram")}
        icon={<Telegram size={16} />}
        visibilityName="isTelegramPublic"
      />
      <ContactInformation
        name="whatsapp"
        placeholder={T("profile.form.contactInfo.whatsapp")}
        icon={<WhatsappFill />}
        visibilityName="isWhatsappPublic"
      />
      <ContactInformation
        name="twitter"
        placeholder={T("profile.form.contactInfo.twitter")}
        icon={<TwitterFill />}
        visibilityName="isTwitterPublic"
      />
      <ContactInformation
        name="discord"
        placeholder={T("profile.form.contactInfo.discord")}
        icon={<DiscordFill />}
        visibilityName="isDiscordPublic"
      />
      <ContactInformation
        name="linkedin"
        placeholder={T("profile.form.contactInfo.linkedin")}
        icon={<LinkedinBoxFill />}
        visibilityName="isLinkedInPublic"
      />
    </div>
  );
}
