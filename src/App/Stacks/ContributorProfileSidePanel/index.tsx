import View from "./View";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import UsersApi from "src/api/Users";
import { useState } from "react";
import MeApi from "src/api/me";
import { NotFound } from "src/components/NotFound";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";

type Props = {
  githubUserId: number;
};

export default function ContributorProfileSidePanel({ githubUserId }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { user } = useAuth0();

  const [editMode, setEditMode] = useState(false);
  const isMine = getGithubUserIdFromSub(user?.sub) === githubUserId;

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({
    options: { enabled: isMine && editMode },
  });

  const { data: userProfile, isError } = UsersApi.queries.useUserProfileByGithubId({
    params: { githubUserId: githubUserId.toString() },
    options: { enabled: !isMine, retry: 1 },
  });

  const profile = isMine ? myProfileInfo : userProfile;

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
    return <NotFound />;
  }

  return profile ? <View isOwn={isMine} profile={profile} editMode={editMode} setEditMode={setEditMode} /> : null;
}
