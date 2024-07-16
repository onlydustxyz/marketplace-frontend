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
}

class UserProfile extends mapApiToClass<UserProfileResponse>() implements UserInterface {
  constructor(readonly props: UserProfileResponse) {
    super(props);
  }

  hasContact(channel: UserProfileContactChannel): boolean {
    return this.contacts?.some(c => c.channel === channel && c.contact) ?? false;
  }
}

export { UserProfile };
