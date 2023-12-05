import { UserProfileInfo } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { ArrayElement } from "src/types";

type Channel = ArrayElement<NonNullable<UseGetMyProfileInfoResponse["contacts"]>>["channel"];

function calculateUserCompletionScore(userProfile: UseGetMyProfileInfoResponse) {
  const scoreByExistence = (fieldName: keyof typeof userProfile, score: number) => (userProfile[fieldName] ? score : 0);

  const scoreContact = (channel: Channel, score: number) =>
    userProfile.contacts?.find(contact => contact.channel === channel && contact.contact) ? score : 0;

  const scoreTechnologies = (score: number) => (Object.keys(userProfile.technologies ?? {}).length ? score : 0);

  return (
    scoreByExistence("avatarUrl", 5) +
    scoreByExistence("login", 15) +
    scoreByExistence("location", 10) +
    scoreByExistence("bio", 20) +
    scoreByExistence("website", 10) +
    scoreContact("EMAIL", 5) +
    scoreContact("TELEGRAM", 5) +
    scoreContact("WHATSAPP", 5) +
    scoreContact("TWITTER", 5) +
    scoreContact("DISCORD", 5) +
    scoreContact("LINKEDIN", 5) +
    scoreTechnologies(10)
  );
}

export type FormValuesProps = {
  avatarUrl: string;
} & UserProfileInfo;

function calculateFormCompletionScore(formValues: FormValuesProps) {
  const score = (value: string | number | null, score: number) => (value && value !== "" ? score : 0);

  return (
    score(formValues?.avatarUrl, 5) +
    score(formValues?.githubHandle, 15) +
    score(formValues?.location, 10) +
    score(formValues?.bio, 20) +
    score(formValues?.website, 10) +
    score(formValues?.email, 5) +
    score(formValues?.telegram, 5) +
    score(formValues?.whatsapp, 5) +
    score(formValues?.twitter, 5) +
    score(formValues?.discord, 5) +
    score(formValues?.linkedin, 5) +
    score(Object.keys(formValues?.technologies).length, 10)
  );
}

export { calculateUserCompletionScore, calculateFormCompletionScore };
