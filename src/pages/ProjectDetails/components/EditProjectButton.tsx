import { generatePath, useNavigate } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType } from "src/components/Button";

import { useIntl } from "src/hooks/useIntl";
import { parseFlag } from "src/utils/parseFlag";

type EditProjectButtonProps = { projectKey: string };

export function EditProjectButton({ projectKey }: EditProjectButtonProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const isEditProjectEnabled = parseFlag("VITE_CAN_EDIT_PROJECT");

  return isEditProjectEnabled ? (
    <Button
      type={ButtonType.Secondary}
      size={ButtonSize.Sm}
      className="bg-spaceBlue-900"
      onClick={() =>
        navigate(
          generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, {
            projectKey,
          })
        )
      }
    >
      {T("project.details.edit.title")}
    </Button>
  ) : null;
}
