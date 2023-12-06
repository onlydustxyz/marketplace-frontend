import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import {
  GITHUB_PERMISSIONS,
  useLazyGetUserPermissions,
} from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";

import { useIntl } from "src/hooks/useIntl";
import { useLoginUrl, useLoginUrlStorage } from "src/hooks/useLoginUrl/useLoginUrl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import MagicLine from "src/icons/MagicLine";

type ClaimButton = { projectKey: string; callback: () => void };

export function ClaimButton({ projectKey, callback }: ClaimButton) {
  const { T } = useIntl();
  const [getPermission] = useLazyGetUserPermissions();
  const getLoginUrl = useLoginUrl();
  const loginUrlStorage = useLoginUrlStorage();
  const dispatchSession = useSessionDispatch();

  const startprojectClaim = async () => {
    try {
      const hasRequirePermission = await getPermission(GITHUB_PERMISSIONS.READ_ORG);
      if (hasRequirePermission) {
        callback();
      } else {
        dispatchSession({
          method: SessionMethod.SetVisitedPageBeforeLogin,
          value: generatePath(`${RoutePaths.ProjectDetails}`, {
            projectKey,
          }),
        });
        loginUrlStorage.setValue(`${GITHUB_PERMISSIONS.USER_EMAIL},${GITHUB_PERMISSIONS.READ_ORG}`);
        const login_url = getLoginUrl();
        window.location.replace(login_url);
      }
    } catch {
      // do nothing
    }
  };

  return (
    <Button type={ButtonType.Primary} size={ButtonSize.Sm} onClick={startprojectClaim}>
      <MagicLine className="text-xl font-normal text-black" />
      {T("project.claim.banner.button")}
    </Button>
  );
}
