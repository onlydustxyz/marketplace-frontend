import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { TProfileForm } from "./form.types";

// function sanitizeContactHandle(contact: string) {
//   let sanitizedContact = contact;

//   if (contact.endsWith("/")) {
//     sanitizedContact = sanitizedContact.slice(0, -1);
//   }

//   if (contact.includes("/")) {
//     sanitizedContact = sanitizedContact.split("/").at(-1) ?? "";
//   }

//   if (contact.startsWith("@")) {
//     sanitizedContact = sanitizedContact.substring(1);
//   }

//   return sanitizedContact;
// }

// function createContact({
//   channel,
//   contact,
//   isPublic,
//   prefixUrl,
// }: TProfileForm.CreateContactProps): components["schemas"]["ContactInformation"] {
//   return {
//     channel,
//     contact: contact ? `${prefixUrl || ""}${sanitizeContactHandle(contact)}` : "",
//     visibility: isPublic ? "public" : "private",
//   };
// }

export function formatData(data: UseGetMyProfileInfoResponse): TProfileForm.Data {
  const { avatarUrl, cover, location, bio, website, contacts, technologies, allocatedTimeToContribute } = data;

  function getContactInfo(contact: TProfileForm.Contact["channel"]) {
    const contactInfo = contacts?.find(contactInfo => contactInfo.channel === contact);

    return {
      contact: contactInfo?.contact ?? "",
      isPublic: contactInfo?.visibility === "public",
    };
  }

  return {
    avatarUrl: avatarUrl ?? "",
    cover: cover ?? "BLUE",
    location: location ?? "",
    bio: bio ?? "",
    website: website ?? "",
    // contacts:
    //   contacts?.map(contact => ({
    //     channel: contact.channel,
    //     contact: contact.contact,
    //     visibility: contact.visibility,
    //   })) ?? [],
    telegram: getContactInfo("TELEGRAM"),
    whatsapp: getContactInfo("WHATSAPP"),
    twitter: getContactInfo("TWITTER"),
    discord: getContactInfo("DISCORD"),
    linkedin: getContactInfo("LINKEDIN"),
    technologies: technologies ?? {},
    weeklyAllocatedTime: allocatedTimeToContribute ?? TProfileForm.ALLOCATED_TIME.NONE,
    lookingForAJob: data.isLookingForAJob ?? false,
  };
}
