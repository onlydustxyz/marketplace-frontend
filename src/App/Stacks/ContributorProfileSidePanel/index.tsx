import View from "./View";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import ErrorState from "src/components/ErrorState";
import UsersApi from "src/api/Users";
import { useState } from "react";
import MeApi from "src/api/me";

type Props = {
  githubUserId: number;
};

export default function ContributorProfileSidePanel({ githubUserId }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { githubUserId: currentUserGithubId } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const isOwnProfile = currentUserGithubId === githubUserId;

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({
    options: { enabled: isOwnProfile && editMode },
  });

  const { data: userProfile, isError } = UsersApi.queries.useUserProfileByGithubId({
    params: { githubUserId: githubUserId.toString() },
    options: { enabled: !isOwnProfile },
  });

  const profile = isOwnProfile ? myProfileInfo : userProfile;

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
    return (
      <div className="m-4 mt-12">
        <ErrorState />
      </div>
    );
  }

  return profile ? <View isOwn={isOwnProfile} profile={profile} editMode={editMode} setEditMode={setEditMode} /> : null;
}
