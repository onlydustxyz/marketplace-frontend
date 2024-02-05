import { components } from "src/__generated/api";
import { LanguageMap } from "src/types";

export namespace TProfileForm {
  type Cover = components["schemas"]["PrivateUserProfileResponse"]["cover"];

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
    avatarUrl?: string;
    cover: Cover;
    location: string;
    bio: string;
    website: string;
    telegram: ContactProps;
    whatsapp: ContactProps;
    twitter: ContactProps;
    discord: ContactProps;
    linkedin: ContactProps;
    technologies: LanguageMap;
    weeklyAllocatedTime: components["schemas"]["PrivateUserProfileResponse"]["allocatedTimeToContribute"];
    lookingForAJob: boolean;
  }
}
