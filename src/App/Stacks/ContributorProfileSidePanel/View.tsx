import ReadOnlyView from "./ReadOnlyView";
import { useState } from "react";
import EditView from "./EditView";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";
import MeApi from "src/api/me";

type Props = {
  restFulProfile: Profile;
  isOwn?: boolean;
};

export default function View({ isOwn, restFulProfile }: Props) {
  const [editMode, setEditMode] = useState(false);

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  return editMode && myProfileInfo ? (
    <EditView profile={myProfileInfo} restFulProfile={restFulProfile} setEditMode={setEditMode} />
  ) : (
    <ReadOnlyView userProfile={restFulProfile} setEditMode={setEditMode} isOwn={isOwn} myProfile={myProfileInfo} />
  );
}
