import ReadOnlyView from "./ReadOnlyView";
import { useState } from "react";
import EditView from "./EditView";
import MeApi from "src/api/me";
import { UserProfile } from "src/api/Users/queries";

type Props = {
  userProfile: UserProfile;
  isOwn?: boolean;
};

export default function View({ isOwn, userProfile }: Props) {
  const [editMode, setEditMode] = useState(false);

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({
    options: { enabled: isOwn && editMode },
  });

  return editMode && myProfileInfo ? (
    <EditView myProfile={myProfileInfo} setEditMode={setEditMode} />
  ) : (
    <ReadOnlyView profile={userProfile} setEditMode={setEditMode} isOwn={isOwn} />
  );
}
