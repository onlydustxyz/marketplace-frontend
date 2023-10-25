import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";

import ReadOnlyView from "./ReadOnlyView";
import { useState } from "react";
import EditView from "./EditView";
import { UserProfile } from "./useUserProfile";
import { Profile } from "src/hooks/useProfile/useProfile";

type Props = {
  userProfile: Profile;
  setOpen: (value: boolean) => void;
  isOwn?: boolean;
};

export default function View({ isOwn, userProfile, setOpen }: Props) {
  const [editMode, setEditMode] = useState(false);

  return editMode ? (
    <></>
  ) : (
    // <EditView
    //   profile={userProfile as UserProfileFragment & OwnUserProfileDetailsFragment}
    //   setEditMode={setEditMode}
    // />
    <ReadOnlyView setOpen={setOpen} userProfile={userProfile} setEditMode={setEditMode} isOwn={isOwn} />
  );
}
