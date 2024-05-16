import { UseUpdateProfileBody } from "src/api/me/mutations";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { TApplyForm } from "./form.types";

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

function createContact({ channel, contact, isPublic, prefixUrl }: TApplyForm.CreateContactProps): TApplyForm.Contact {
  return {
    channel,
    contact: contact ? `${prefixUrl || ""}${sanitizeContactHandle(contact)}` : "",
    visibility: isPublic ? "public" : "private",
  };
}

export function formatToData(profile: UseGetMyProfileInfoResponse): TApplyForm.UserProfileInfo {
  const { contacts } = profile;

  function getContactInfo(contact: TApplyForm.Contact["channel"]) {
    const contactInfo = contacts?.find(contactInfo => contactInfo.channel === contact);

    return {
      contact: sanitizeContactHandle(contactInfo?.contact ?? ""),
      isPublic: contactInfo?.visibility === "public",
    };
  }

  return {
    telegram: getContactInfo("TELEGRAM"),
  };
}

export function formatToSchema({ oldData, newData }: TApplyForm.FormatToSchemaProps): Partial<UseUpdateProfileBody> {
  const {
    firstName,
    lastName,
    avatarUrl,
    location,
    bio,
    website,
    contacts,
    technologies,
    allocatedTimeToContribute,
    isLookingForAJob,
  } = oldData;

  const { telegram } = newData;

  return {
    firstName,
    lastName,
    avatarUrl,
    location,
    bio,
    website,
    contacts: [
      ...(contacts?.filter(contact => contact.channel !== "TELEGRAM") || []),
      createContact({
        channel: "TELEGRAM",
        contact: telegram.contact,
        isPublic: telegram.isPublic,
        prefixUrl: "https://t.me/",
      }),
    ],
    technologies,
    allocatedTimeToContribute,
    isLookingForAJob,
  };
}
