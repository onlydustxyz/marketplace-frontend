import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";
import Telegram from "src/assets/icons/Telegram";
import ContactInformation from "src/components/ContactInformations/ContactInformation";
import { useIntl } from "src/hooks/useIntl";

export function Contact() {
  const { T } = useIntl();

  return (
    <div className="grid gap-2 pb-14">
      <ContactInformation
        name="telegram"
        placeholder={T("onboarding.contact.telegram.placeholder")}
        icon={<Telegram size={16} className="fill-greyscale-400" />}
        visibilityName="isTelegramPublic"
        options={{
          pattern: {
            value: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
            message: T("profile.form.contactInfo.invalidUsername"),
          },
        }}
      />
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
        <Typography variant="body-s-bold" className="text-spaceBlue-200">
          <Icon remixName="ri-error-warning-line" /> {T("onboarding.contact.telegram.message")}
        </Typography>

        <a
          href="https://web.telegram.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 font-medium text-spacePurple-500"
        >
          <Icon remixName="ri-external-link-line" />
          <span className="font-walsheim text-sm group-hover:underline">{T("onboarding.contact.telegram.link")}</span>
        </a>
      </div>
    </div>
  );
}
