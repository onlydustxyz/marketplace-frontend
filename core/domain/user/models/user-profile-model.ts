import { UserJoiningReason, UserProfileContact, UserProfileContactChannel } from "core/domain/user/models/user.types";
import { USER_PROFILE_JOINING_REASON } from "core/domain/user/user-constants";

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

  static isValidJoiningReason(joiningReason?: string): joiningReason is UserJoiningReason {
    return (
      joiningReason === USER_PROFILE_JOINING_REASON.CONTRIBUTOR ||
      joiningReason === USER_PROFILE_JOINING_REASON.MAINTAINER ||
      joiningReason === USER_PROFILE_JOINING_REASON.SPONSOR
    );
  }

  isMaintainer() {
    return this.joiningReason === USER_PROFILE_JOINING_REASON.MAINTAINER;
  }
}
