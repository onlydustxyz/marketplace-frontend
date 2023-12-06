import View from "./View";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import ErrorState from "src/components/ErrorState";
import UsersApi from "src/api/Users";

type Props = {
  githubUserId: number;
};

export default function ContributorProfileSidePanel({ githubUserId }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { githubUserId: currentUserGithubId } = useAuth();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = UsersApi.queries.useUserProfileByGithubId({
    params: { githubUserId: githubUserId.toString() },
  });

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
    return (
      <div className="m-4 mt-12">
        <ErrorState />
      </div>
    );
  }

  return userProfile ? (
    <View isOwn={currentUserGithubId === userProfile.githubUserId} userProfile={userProfile} />
  ) : null;
}
