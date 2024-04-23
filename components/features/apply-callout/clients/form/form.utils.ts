import { UseUpdateProfileBody } from "src/api/me/mutations";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { TApplyCallout } from "../../apply-callout.types";
import { TApplyForm } from "./form.types";

export function fromFragment(profile: UseGetMyProfileInfoResponse): Partial<TApplyForm.UserProfileInfo> {
  const { contacts } = profile;

  const getContactInfo = (channel: TApplyCallout.Channel) =>
    contacts?.find(contact => contact.channel === channel)?.contact;

  const isContactPublic = (channel: TApplyCallout.Channel) =>
    contacts?.find(contact => contact.channel === channel)?.visibility === "public" ?? true;

  return {
    telegram: getContactInfo("TELEGRAM")?.split("/").at(-1) ?? "",
    isTelegramPublic: isContactPublic("TELEGRAM"),
  };
}

export function mapFormDataToSchema(profile: TApplyForm.UserProfileInfo): Partial<UseUpdateProfileBody> {
  const { telegram, isTelegramPublic } = profile;

  return {
    contacts: [
      {
        channel: "TELEGRAM",
        contact: telegram ? `${"https://t.me/" || ""}${sanitizeContactHandle(telegram)}` : "",
        visibility: isTelegramPublic ? "public" : "private",
      },
    ],
  };
}

function sanitizeContactHandle(contact: string) {
  let sanitizedContact = contact;
  if (contact.endsWith("/")) {
    sanitizedContact = sanitizedContact.slice(0, -1);
  }
  if (contact.includes("/")) {
    sanitizedContact = sanitizedContact.split("/").at(-1) ?? "";
  }
  if (contact.startsWith("@")) {
    sanitizedContact = sanitizedContact.substring(1);
  }
  return sanitizedContact;
}
