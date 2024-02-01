import { components } from "src/__generated/api";
import { LanguageMap } from "src/types";

export namespace TProfileForm {
  export enum ALLOCATED_TIME {
    LESS_THAN_ONE_DAY = "LESS_THAN_ONE_DAY",
    GREATER_THAN_THREE_DAYS = "GREATER_THAN_THREE_DAYS",
    NONE = "NONE",
    ONE_TO_THREE_DAYS = "ONE_TO_THREE_DAYS",
  }

  type Cover = components["schemas"]["PrivateUserProfileResponse"]["cover"];
  export type Contact = components["schemas"]["ContactInformation"];

  interface ContactProps {
    contact: string;
    isPublic: boolean;
  }

  export interface Data {
    avatarUrl?: string;
    cover: Cover;
    location: string;
    bio: string;
    website: string;
    // contacts: Contact[] | [];
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
