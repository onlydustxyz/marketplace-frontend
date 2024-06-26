import { components } from "src/__generated/api";

export namespace TProfileForm {
  interface ContactProps {
    contact: string;
    isPublic: boolean;
  }

  export enum ALLOCATED_TIME {
    NONE = "NONE",
    LESS_THAN_ONE_DAY = "LESS_THAN_ONE_DAY",
    ONE_TO_THREE_DAYS = "ONE_TO_THREE_DAYS",
    GREATER_THAN_THREE_DAYS = "GREATER_THAN_THREE_DAYS",
  }

  export type Contact = components["schemas"]["ContactInformation"];

  export interface CreateContactProps extends ContactProps {
    channel: Contact["channel"];
    prefixUrl?: string;
  }

  export interface Data {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    location: string;
    bio: string;
    website: string;
    telegram: ContactProps;
    whatsapp: ContactProps;
    twitter: ContactProps;
    discord: ContactProps;
    linkedin: ContactProps;
    weeklyAllocatedTime: components["schemas"]["PrivateUserProfileResponse"]["allocatedTimeToContribute"];
    lookingForAJob: boolean;
  }
}
