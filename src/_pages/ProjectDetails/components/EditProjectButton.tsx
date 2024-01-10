import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useLazyGetUserPermissions } from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";

import { useIntl } from "src/hooks/useIntl";

type EditProjectButtonProps = { projectKey: string };

export function EditProjectButton({ projectKey }: EditProjectButtonProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const [getPermission] = useLazyGetUserPermissions();

  function handleClick() {
    navigate(
      generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, {
        projectKey,
      }),
      { state: { prevPath: location.pathname, slug: projectKey } }
    );
  }

  return (
    <Button
      type={ButtonType.Secondary}
      size={ButtonSize.Sm}
      className="flex-1 bg-spaceBlue-900 lg:flex-initial"
      onClick={handleClick}
    >
      {T("project.details.edit.title")}
    </Button>
  );
}
