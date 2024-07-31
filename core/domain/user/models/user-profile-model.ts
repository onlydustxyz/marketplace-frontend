import { UserProfileContact, UserProfileContactChannel } from "core/domain/user/models/user.types";

import { components } from "src/__generated/api";

type UserProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export interface UserProfileInterface extends UserProfileResponse {
  hasContact(channel: UserProfileContactChannel): boolean;
  getContact(channel: UserProfileContactChannel): UserProfileContact | undefined;
  getContactTelegram(): UserProfileContact | undefined;
  isMaintainer(): boolean;
}

export class UserProfile implements UserProfileInterface {
  allocatedTimeToContribute!: UserProfileResponse["allocatedTimeToContribute"];
  avatarUrl!: UserProfileResponse["avatarUrl"];
  bio!: UserProfileResponse["bio"];
  contacts!: UserProfileResponse["contacts"];
  firstName!: UserProfileResponse["firstName"];
  githubUserId!: UserProfileResponse["githubUserId"];
  id!: UserProfileResponse["id"];
  isLookingForAJob!: UserProfileResponse["isLookingForAJob"];
  joiningReason!: UserProfileResponse["joiningReason"];
  lastName!: UserProfileResponse["lastName"];
  location!: UserProfileResponse["location"];
  login!: UserProfileResponse["login"];
  website!: UserProfileResponse["website"];

  constructor(props: UserProfileResponse) {
    Object.assign(this, props);
  }

  hasContact(channel: UserProfileContactChannel) {
    return this.contacts?.some(c => c.channel === channel && c.contact) ?? false;
  }

  getContact(channel: UserProfileContactChannel) {
    return this.contacts?.find(c => c.channel === channel && c.contact);
  }

  getContactTelegram() {
    return this.getContact(UserProfileContactChannel.telegram);
  }

  static sanitizeChannelContact(contact: string) {
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

  static buildContact({
    channel,
    contact,
    visibility = "private",
  }: {
    channel: UserProfileContactChannel;
    contact: string;
    visibility?: "public" | "private";
  }) {
    return { channel, contact: this.sanitizeChannelContact(contact), visibility };
  }

  static isValidJoiningReason(joiningReason?: string) {
    return joiningReason === "CONTRIBUTOR" || joiningReason === "MAINTAINER" || joiningReason === "SPONSOR";
  }

  isMaintainer() {
    return this.joiningReason === "MAINTAINER";
  }
}
