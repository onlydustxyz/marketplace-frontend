import ReadOnlyView from "./ReadOnlyView";
import { useState } from "react";
import EditView from "./EditView";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";
import MeApi from "src/api/me";

type Props = {
  restFulProfile: Profile;
  setOpen: (value: boolean) => void;
  isOwn?: boolean;
};

export default function View({ isOwn, restFulProfile, setOpen }: Props) {
  const [editMode, setEditMode] = useState(false);

  const {
    data: myProfileInfo,
    isLoading: myProfileInfoLoading,
    isError: myProfileInfoError,
  } = MeApi.queries.useGetMyProfileInfo({});

  return editMode && myProfileInfo ? (
    <EditView profile={myProfileInfo} restFulProfile={restFulProfile} setEditMode={setEditMode} />
  ) : (
    <ReadOnlyView
      setOpen={setOpen}
      userProfile={restFulProfile}
      setEditMode={setEditMode}
      isOwn={isOwn}
      myProfile={myProfileInfo}
    />
  );
}
