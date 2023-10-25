import View from "./View";
import { useAuth } from "src/hooks/useAuth";
import useUserProfile from "./useUserProfile";

type Props = {
  githubUserId: number;
  setOpen: (value: boolean) => void;
};

export default function ContributorProfileSidePanel({ githubUserId, setOpen }: Props) {
  const { githubUserId: currentUserGithubId } = useAuth();
  const { data: userProfile } = useUserProfile({ githubUserId });

  return userProfile ? (
    <View isOwn={currentUserGithubId === userProfile.githubUserId} userProfile={userProfile} setOpen={setOpen} />
  ) : null;
}
