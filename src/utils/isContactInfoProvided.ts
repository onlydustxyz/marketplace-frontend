import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";

export default function isContactInfoProvided(profile: Profile, channels: Channel | Channel[]) {
  const channelsArray = Array.isArray(channels) ? channels : [channels];

  return channelsArray.some(channel => {
    return profile?.contacts?.some(contact => contact.channel === channel && Boolean(contact.contact));
  });
}
