import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { TProfileForm } from "./form.types";

export function sanitizeContactHandle(contact: string) {
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

export function createContact({
  channel,
  contact,
  isPublic,
  prefixUrl,
}: TProfileForm.CreateContactProps): TProfileForm.Contact {
  return {
    channel,
    contact: contact ? `${prefixUrl || ""}${sanitizeContactHandle(contact)}` : "",
    visibility: isPublic ? "public" : "private",
  };
}

export function formatToData(data: UseGetMyProfileInfoResponse): TProfileForm.Data {
  const { firstName, lastName, contactEmail, avatarUrl, location, bio, website, contacts, allocatedTimeToContribute } =
    data;

  function getContactInfo(contact: TProfileForm.Contact["channel"]) {
    const contactInfo = contacts?.find(contactInfo => contactInfo.channel === contact);

    return {
      contact: sanitizeContactHandle(contactInfo?.contact ?? ""),
      isPublic: contactInfo?.visibility === "public",
    };
  }

  return {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    contactEmail: contactEmail ?? "",
    avatarUrl: avatarUrl ?? "",
    location: location ?? "",
    bio: bio ?? "",
    website: website ?? "",
    telegram: getContactInfo("TELEGRAM"),
    whatsapp: getContactInfo("WHATSAPP"),
    twitter: getContactInfo("TWITTER"),
    discord: getContactInfo("DISCORD"),
    linkedin: getContactInfo("LINKEDIN"),
    weeklyAllocatedTime: allocatedTimeToContribute ?? TProfileForm.ALLOCATED_TIME.NONE,
    lookingForAJob: data.isLookingForAJob ?? false,
    notifications: {
      ["MAINTAINER_PROJECT_CONTRIBUTOR"]: {
        email: false,
        summary: false,
      },
    },
  };
}

export function formatToSchema(data: Omit<TProfileForm.Data, "notifications">) {
  const {
    firstName,
    lastName,
    avatarUrl,
    location,
    bio,
    website,
    telegram,
    whatsapp,
    twitter,
    discord,
    linkedin,
    weeklyAllocatedTime,
    lookingForAJob,
    contactEmail,
  } = data;

  return {
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    avatarUrl: avatarUrl || undefined,
    location: location || undefined,
    contactEmail: contactEmail || undefined,
    bio: bio || undefined,
    website: website || undefined,
    contacts: [
      createContact({
        channel: "TELEGRAM",
        contact: telegram.contact,
        isPublic: telegram.isPublic,
        prefixUrl: "https://t.me/",
      }),
      createContact({
        channel: "WHATSAPP",
        contact: whatsapp.contact,
        isPublic: whatsapp.isPublic,
      }),
      createContact({
        channel: "TWITTER",
        contact: twitter.contact,
        isPublic: twitter.isPublic,
        prefixUrl: "https://x.com/",
      }),
      createContact({
        channel: "DISCORD",
        contact: discord.contact,
        isPublic: discord.isPublic,
      }),
      createContact({
        channel: "LINKEDIN",
        contact: linkedin.contact,
        isPublic: linkedin.isPublic,
        prefixUrl: "https://www.linkedin.com/in/",
      }),
    ],
    allocatedTimeToContribute: weeklyAllocatedTime,
    isLookingForAJob: lookingForAJob,
  };
}
