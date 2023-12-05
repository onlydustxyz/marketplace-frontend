import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";

import ReadOnlyView from "./ReadOnlyView";
import { useState } from "react";
import EditView from "./EditView";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";

type Props = {
  gqlProfile?: UserProfileFragment & OwnUserProfileDetailsFragment; // we don't want to update the edit form with reste for now
  restFulProfile: Profile; // we don't want to update the edit form with reste for now
  isOwn?: boolean;
};

export default function View({ isOwn, restFulProfile, gqlProfile }: Props) {
  const [editMode, setEditMode] = useState(false);

  return editMode && gqlProfile ? (
    <EditView profile={gqlProfile} restFulProfile={restFulProfile} setEditMode={setEditMode} />
  ) : (
    <ReadOnlyView userProfile={restFulProfile} setEditMode={setEditMode} isOwn={isOwn} gqlProfile={gqlProfile} />
  );
}
