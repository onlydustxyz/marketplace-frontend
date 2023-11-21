import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import {
  GITHUB_PERMISSIONS,
  useLazyGetUserPermissions,
} from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";

import { useIntl } from "src/hooks/useIntl";
import { useLoginUrl, useLoginUrlStorage } from "src/hooks/useLoginUrl/useLoginUrl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import { parseFlag } from "src/utils/parseFlag";

type EditProjectButtonProps = { projectKey: string };

export function EditProjectButton({ projectKey }: EditProjectButtonProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditProjectEnabled = parseFlag("VITE_CAN_EDIT_PROJECT");
  const [getPermission] = useLazyGetUserPermissions();
  const getLoginUrl = useLoginUrl();
  const loginUrlStorage = useLoginUrlStorage();
  const dispatchSession = useSessionDispatch();

  const startProjectEdition = async () => {
    const hasRequirePermission = await getPermission(GITHUB_PERMISSIONS.READ_ORG);
    if (hasRequirePermission) {
      navigate(
        generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, {
          projectKey,
        }),
        { state: { prevPath: location.pathname, slug: projectKey } }
      );
    } else {
      dispatchSession({
        method: SessionMethod.SetVisitedPageBeforeLogin,
        value: generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, {
          projectKey,
        }),
      });
      loginUrlStorage.setValue(`${GITHUB_PERMISSIONS.USER_EMAIL},${GITHUB_PERMISSIONS.READ_ORG}`);
      const login_url = getLoginUrl();
      window.location.replace(login_url);
    }
  };

  return isEditProjectEnabled ? (
    <Button type={ButtonType.Secondary} size={ButtonSize.Sm} className="bg-spaceBlue-900" onClick={startProjectEdition}>
      {T("project.details.edit.title")}
    </Button>
  ) : null;
}
