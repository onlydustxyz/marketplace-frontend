import { UseGetMyProfileResponse } from "src/api/me/queries";
import { ArrayElement } from "src/types";

type Channel = ArrayElement<NonNullable<UseGetMyProfileResponse["contacts"]>>["channel"];

export function calculateCompletionScore(userProfile: UseGetMyProfileResponse) {
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
