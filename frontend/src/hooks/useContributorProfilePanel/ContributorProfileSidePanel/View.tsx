import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";

import { Project } from "./ReadOnlyView/ProjectCard";
import ReadOnlyView from "./ReadOnlyView";
import { useEffect, useState } from "react";
import EditView from "./EditView";
import { HeaderColor } from "./Header";

type Props = {
  profile: UserProfileFragment;
  projects: Project[];
  open: boolean;
  setOpen: (value: boolean) => void;
  headerColor: HeaderColor;
  isOwn?: boolean;
};

export default function View({ isOwn, profile, projects, headerColor, open, setOpen }: Props) {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (!open) setEditMode(false);
  }, [open]);

  return (
    <SidePanel open={open} setOpen={setOpen}>
      {editMode ? (
        <EditView
          profile={profile as UserProfileFragment & OwnUserProfileDetailsFragment}
          headerColor={headerColor}
          setEditMode={setEditMode}
        />
      ) : (
        <ReadOnlyView
          setOpen={setOpen}
          profile={profile}
          projects={projects}
          headerColor={headerColor}
          setEditMode={setEditMode}
          isOwn={isOwn}
        />
      )}
    </SidePanel>
  );
}
