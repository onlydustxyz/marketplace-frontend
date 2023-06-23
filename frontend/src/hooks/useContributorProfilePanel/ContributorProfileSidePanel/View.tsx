import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";

import { Project } from "./ReadOnlyView/ProjectCard";
import ReadOnlyView from "./ReadOnlyView";
import { useEffect, useState } from "react";
import EditView from "./EditView";

type Props = {
  profile: UserProfileFragment;
  projects: Project[];
  open: boolean;
  setOpen: (value: boolean) => void;
  isOwn?: boolean;
};

export default function View({ isOwn, profile, projects, open, setOpen }: Props) {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (!open) setEditMode(false);
  }, [open]);

  return (
    <SidePanel open={open} setOpen={setOpen}>
      {editMode ? (
        <EditView profile={profile as UserProfileFragment & OwnUserProfileDetailsFragment} setEditMode={setEditMode} />
      ) : (
        <ReadOnlyView setOpen={setOpen} profile={profile} projects={projects} setEditMode={setEditMode} isOwn={isOwn} />
      )}
    </SidePanel>
  );
}
