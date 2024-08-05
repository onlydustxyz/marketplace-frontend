import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { STORAGE_KEY_CREATE_PROJECT_STEP } from "src/_pages/ProjectCreation/hooks/useProjectCreationStorage";

import { Button } from "components/ds/button/button";
import { Popover } from "components/ds/modals/popover/popover";

import { NEXT_ROUTER } from "constants/router";

import { AddProjectModal } from "../modal/add-project-modal";
import { TAddProjectButton } from "./add-project-button.types";

export function AddProjectButton({ buttonProps }: TAddProjectButton.Props) {
  const { isAuthenticated } = useAuth0();
  const canResume = useMemo(() => !!localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP), []);
  const router = useRouter();

  const startProjectCreation = async () => {
    if (isAuthenticated) {
      router.push(NEXT_ROUTER.projects.creation);
    } else {
      router.push(NEXT_ROUTER.signup.root);
    }
  };

  return canResume ? (
    <Popover placement={"bottom-start"} content={<AddProjectModal startProjectCreation={startProjectCreation} />}>
      <Button {...buttonProps} />
    </Popover>
  ) : (
    <Button {...buttonProps} onClick={startProjectCreation} />
  );
}
