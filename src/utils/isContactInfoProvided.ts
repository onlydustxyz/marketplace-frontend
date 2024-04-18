import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

export default function isContactInfoProvided(profile: UseGetMyProfileInfoResponse, channels: Channel | Channel[]) {
  const channelsArray = Array.isArray(channels) ? channels : [channels];

  return channelsArray.some(channel => {
    return profile?.contacts?.some(contact => contact.channel === channel && Boolean(contact.contact));
  });
}
