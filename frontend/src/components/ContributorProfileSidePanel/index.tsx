import { useUserProfileQuery } from "src/__generated/graphql";
import View from "./View";
import { contextWithCacheHeaders } from "src/utils/headers";

type Props = {
  githubUserId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ContributorProfileSidePanel({ githubUserId, ...rest }: Props) {
  const { data } = useUserProfileQuery({ variables: { githubUserId }, ...contextWithCacheHeaders });
  const userProfile = data?.userProfiles.at(0);

  return userProfile ? <View profile={userProfile} {...rest} /> : <div />;
}
