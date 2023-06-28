import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";

import ReadOnlyView from "./ReadOnlyView";
import { useEffect, useState } from "react";
import EditView from "./EditView";
import { UserProfile } from "./useUserProfile";

type Props = {
  userProfile: UserProfile;
  open: boolean;
  setOpen: (value: boolean) => void;
  isOwn?: boolean;
};

export default function View({ isOwn, userProfile, open, setOpen }: Props) {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (!open) setEditMode(false);
  }, [open]);

  return (
    <SidePanel open={open} setOpen={setOpen}>
      {editMode ? (
        <EditView
          profile={userProfile.profile as UserProfileFragment & OwnUserProfileDetailsFragment}
          setEditMode={setEditMode}
        />
      ) : (
        <ReadOnlyView setOpen={setOpen} userProfile={userProfile} setEditMode={setEditMode} isOwn={isOwn} />
      )}
    </SidePanel>
  );
}
