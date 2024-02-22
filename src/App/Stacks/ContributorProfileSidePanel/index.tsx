"use client";

import { useEffect, useState } from "react";

import UsersApi from "src/api/Users";
import MeApi from "src/api/me";
import { NotFound } from "src/components/NotFound";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import { useShowToaster } from "src/hooks/useToaster";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import View from "./View";

type Props = {
  githubUserId: number;
};

export default function ContributorProfileSidePanel({ githubUserId }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { githubUserId: currentGithubUserId } = useCurrentUser();
  const { capture } = usePosthog();

  const [editMode, setEditMode] = useState(false);
  const isMine = currentGithubUserId === githubUserId;

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({
    options: { enabled: isMine && editMode },
  });

  const { data: userProfile, isError } = UsersApi.queries.useUserProfileByGithubId({
    params: { githubUserId: githubUserId.toString() },
    options: { enabled: !isMine, retry: 1 },
  });

  const profile = isMine ? myProfileInfo : userProfile;

  useEffect(() => {
    if (profile) {
      capture("contributor_viewed", { id: profile.githubUserId, type: "panel" });
    }
  }, [profile]);

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
    return <NotFound />;
  }

  return profile ? <View isOwn={isMine} profile={profile} editMode={editMode} setEditMode={setEditMode} /> : null;
}
