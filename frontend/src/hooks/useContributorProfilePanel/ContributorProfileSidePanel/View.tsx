import { UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";

import { Project } from "./ReadOnlyView/ProjectCard";
import ReadOnlyView from "./ReadOnlyView";
import { useState } from "react";
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

export default function View({ isOwn, profile, projects, headerColor, setOpen, ...rest }: Props) {
  const [editMode, setEditMode] = useState(false);

  return (
    <SidePanel {...rest} setOpen={setOpen}>
      {editMode ? (
        <EditView profile={profile} headerColor={headerColor} setEditMode={setEditMode} />
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
