import { PropsWithChildren, useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import {
  GITHUB_PERMISSIONS,
  useLazyGetUserPermissions,
} from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";
import { useLoginUrl, useLoginUrlStorage } from "src/hooks/useLoginUrl/useLoginUrl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";

interface ProtectedByGithubProps extends PropsWithChildren {
  requiredPermission: GITHUB_PERMISSIONS;
  redirectTo?: string;
}

export default function ProtectedByGithub({
  requiredPermission = GITHUB_PERMISSIONS.READ_ORG,
  redirectTo = RoutePaths.NotFound,
  children,
}: ProtectedByGithubProps) {
  const params = useParams();
  const getLoginUrl = useLoginUrl();
  const loginUrlStorage = useLoginUrlStorage();
  const dispatchSession = useSessionDispatch();

  const [isAuthorized, setIsAuthorized] = useState<{ ready: boolean; isAuthorized: boolean }>({
    ready: false,
    isAuthorized: false,
  });

  const [getPermission] = useLazyGetUserPermissions();

  const askRequirePermission = () => {
    dispatchSession({
      method: SessionMethod.SetVisitedPageBeforeLogin,
      value: generatePath(redirectTo, params),
    });
    loginUrlStorage.setValue(`${GITHUB_PERMISSIONS.USER_EMAIL},${GITHUB_PERMISSIONS.READ_ORG}`);
    const login_url = getLoginUrl();
    window.location.replace(login_url);
  };

  const retrievePermission = async () => {
    const hasPermission = await getPermission(requiredPermission);

    if (hasPermission) {
      setIsAuthorized({ isAuthorized: hasPermission, ready: true });
    } else {
      askRequirePermission();
    }
  };

  useEffect(() => {
    retrievePermission();
  }, []);

  if (isAuthorized.ready && isAuthorized.isAuthorized) {
    return <>{children}</>;
  }

  return <></>;
}
