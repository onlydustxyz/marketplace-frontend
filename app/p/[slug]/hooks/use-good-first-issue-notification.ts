import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useEffect, useState } from "react";

import useMutationAlert from "src/api/useMutationAlert";
import { usePosthog } from "src/hooks/usePosthog";

export function useGoodFirstIssuesNotification({ projectId }: { projectId: string }) {
  const { capture } = usePosthog();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: myNotificationSettings } = UserReactQueryAdapter.client.useGetMyNotificationsSettingsForProject({
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
    UserReactQueryAdapter.client.useSetMyNotificationsSettingsForProject({ pathParams: { projectId } });

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
    capture("project_issues_notifications_switched", {
      project_id: projectId,
      project_name: myNotificationSettings?.name,
      enabled: !isNotificationEnabled,
    });
  }

  return {
    isNotificationEnabled,
    handleSetMyNotificationSettings,
  };
}
