import View from "./View";
import { useAuth } from "src/hooks/useAuth";
import useUserProfile from "./useUserProfile";
import useRestfulProfile from "src/hooks/useRestfulProfile/useRestfulProfile";

type Props = {
  githubUserId: number;
};

export default function ContributorProfileSidePanel({ githubUserId }: Props) {
  const { githubUserId: currentUserGithubId } = useAuth();
  const { data: gqlProfile } = useUserProfile({ githubUserId });
  const { data: restFulProfile } = useRestfulProfile({ githubUserId });

  return gqlProfile && restFulProfile ? (
    <View
      isOwn={currentUserGithubId === restFulProfile.githubUserId}
      restFulProfile={restFulProfile}
      gqlProfile={gqlProfile.profile}
    />
  ) : null;
}
