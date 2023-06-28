import View from "./View";
import { useAuth } from "src/hooks/useAuth";
import useUserProfile from "./useUserProfile";

type Props = {
  githubUserId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ContributorProfileSidePanel({ githubUserId, ...rest }: Props) {
  const { githubUserId: currentUserGithubId } = useAuth();
  const userProfile = useUserProfile(githubUserId);

  return userProfile ? (
    <View isOwn={currentUserGithubId === userProfile.profile.githubUserId} userProfile={userProfile} {...rest} />
  ) : (
    <div />
  );
}
