import { UserProfileInfo } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { ArrayElement } from "src/types";

type Channel = ArrayElement<NonNullable<UseGetMyProfileInfoResponse["contacts"]>>["channel"];
type ScorableFields = "avatarUrl" | "login" | "location" | "bio" | "website" | "technologies";

const userScoreDictionary: Record<ScorableFields | Channel, number> = {
  avatarUrl: 5,
  login: 15,
  location: 10,
  bio: 20,
  website: 10,
  technologies: 10,
  EMAIL: 5,
  TELEGRAM: 5,
  WHATSAPP: 5,
  TWITTER: 5,
  DISCORD: 5,
  LINKEDIN: 5,
};

function calculateUserCompletionScore(userProfile: UseGetMyProfileInfoResponse) {
  const scoreByExistence = (fieldName: ScorableFields) => (userProfile[fieldName] ? userScoreDictionary[fieldName] : 0);

  const scoreContact = (channel: Channel) =>
    userProfile.contacts?.some(contact => contact.channel === channel && contact.contact)
      ? userScoreDictionary[channel]
      : 0;

  const scoreTechnologies = () =>
    Object.keys(userProfile.technologies ?? {}).length ? userScoreDictionary.technologies : 0;

  return (
    scoreByExistence("avatarUrl") +
    scoreByExistence("login") +
    scoreByExistence("location") +
    scoreByExistence("bio") +
    scoreByExistence("website") +
    scoreContact("EMAIL") +
    scoreContact("TELEGRAM") +
    scoreContact("WHATSAPP") +
    scoreContact("TWITTER") +
    scoreContact("DISCORD") +
    scoreContact("LINKEDIN") +
    scoreTechnologies()
  );
}

export type FormValuesProps = {
  avatarUrl: string;
} & UserProfileInfo;

type FormScorableFields =
  | "avatarUrl"
  | "githubHandle"
  | "location"
  | "bio"
  | "website"
  | "email"
  | "telegram"
  | "whatsapp"
  | "twitter"
  | "discord"
  | "linkedin"
  | "technologies";

const formScoreDictionary: Record<FormScorableFields, number> = {
  avatarUrl: 5,
  githubHandle: 15,
  location: 10,
  bio: 20,
  website: 10,
  email: 5,
  telegram: 5,
  whatsapp: 5,
  twitter: 5,
  discord: 5,
  linkedin: 5,
  technologies: 10,
};

function calculateFormCompletionScore(formValues: FormValuesProps) {
  const score = (fieldName: FormScorableFields) =>
    formValues[fieldName] && formValues[fieldName] !== "" ? formScoreDictionary[fieldName] : 0;
  const scoreTechnologies = () =>
    Object.keys(formValues.technologies ?? {}).length ? formScoreDictionary.technologies : 0;

  return (
    score("avatarUrl") +
    score("githubHandle") +
    score("location") +
    score("bio") +
    score("website") +
    score("email") +
    score("telegram") +
    score("whatsapp") +
    score("twitter") +
    score("discord") +
    score("linkedin") +
    scoreTechnologies()
  );
}

export { calculateUserCompletionScore, calculateFormCompletionScore };
