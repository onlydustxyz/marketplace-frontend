import { UserProfileContactChannel } from "core/domain/user/models/user.types";

type ContactRegex = Record<Exclude<keyof typeof UserProfileContactChannel, "email">, RegExp>;

export interface ContactFacadePort {
  regex: ContactRegex;
}
