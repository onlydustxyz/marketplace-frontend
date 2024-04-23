import { components } from "src/__generated/api";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

interface ContactInfoProps {
  profile: UseGetMyProfileInfoResponse;
  channels: components["schemas"]["ContactInformation"]["channel"][];
}

export function isContactInfoProvided({ profile, channels }: ContactInfoProps) {
  return channels.some(channel => {
    return profile?.contacts?.some(contact => contact.channel === channel && Boolean(contact.contact));
  });
}
