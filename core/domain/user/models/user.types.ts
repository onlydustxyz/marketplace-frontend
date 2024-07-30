import { components } from "src/__generated/api";

export enum UserProfileContactChannel {
  discord = "DISCORD",
  email = "EMAIL",
  linkedin = "LINKEDIN",
  telegram = "TELEGRAM",
  twitter = "TWITTER",
  whatsapp = "WHATSAPP",
}

export interface UserProfileContact {
  channel: `${UserProfileContactChannel}`;
  contact?: string;
  visibility: "public" | "private";
}

export type UserJoiningReason = components["schemas"]["UserProfileUpdateRequest"]["joiningReason"];
