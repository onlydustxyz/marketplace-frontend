import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type UserProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export enum UserProfileContactChannel {
  Discord = "DISCORD",
  Email = "EMAIL",
  LinkedIn = "LINKEDIN",
  Telegram = "TELEGRAM",
  Twitter = "TWITTER",
  Whatsapp = "WHATSAPP",
}

interface UserInterface extends UserProfileResponse {
  hasContact(channel: UserProfileContactChannel): boolean;
  getContact(channel: UserProfileContactChannel):
    | {
        channel: `${UserProfileContactChannel}`;
        contact?: string;
        visibility: "public" | "private";
      }
    | undefined;
  setContact(params: { channel: UserProfileContactChannel; contact: string; visibility: "public" | "private" }): void;
}

class UserProfile extends mapApiToClass<UserProfileResponse>() implements UserInterface {
  constructor(readonly props: UserProfileResponse) {
    super(props);
  }

  hasContact(channel: UserProfileContactChannel) {
    return this.contacts?.some(c => c.channel === channel && c.contact) ?? false;
  }

  getContact(channel: UserProfileContactChannel) {
    return this.contacts?.find(c => c.channel === channel && c.contact);
  }

  private sanitizeChannelContact(contact: string) {
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

  setContact({
    channel,
    contact,
    visibility = "private",
  }: {
    channel: UserProfileContactChannel;
    contact: string;
    visibility?: "public" | "private";
  }) {
    this.contacts = this.contacts?.map(c =>
      c.channel === channel ? { ...c, contact: this.sanitizeChannelContact(contact), visibility } : c
    );
    this.props.contacts = this.contacts;
  }
}

export { UserProfile };
