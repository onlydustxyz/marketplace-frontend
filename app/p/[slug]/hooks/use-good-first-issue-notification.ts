import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useEffect, useState } from "react";

import useMutationAlert from "src/api/useMutationAlert";

export function useGoodFirstIssuesNotification({ projectId }: { projectId: string }) {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: myNotificationSettings } = UserReactQueryAdapter.client.useGetMyNotificationsSettings({
    pathParams: {
      projectId,
    },
    options: {
      enabled: isAuthenticated,
    },
  });

  useEffect(() => {
    if (myNotificationSettings) {
      setIsNotificationEnabled(myNotificationSettings.onGoodFirstIssueAdded);
    }
  }, [myNotificationSettings]);

  const { mutateAsync: setMyNotificationSettings, ...restSetMyNotificationSettings } =
    UserReactQueryAdapter.client.useSetMyNotificationsSettings({ pathParams: { projectId } });

  useMutationAlert({
    mutation: restSetMyNotificationSettings,
    error: {
      default: true,
    },
  });

  async function handleSetMyNotificationSettings() {
    await setMyNotificationSettings({
      onGoodFirstIssueAdded: !isNotificationEnabled,
    });
  }

  return {
    isNotificationEnabled,
    handleSetMyNotificationSettings,
  };
}
