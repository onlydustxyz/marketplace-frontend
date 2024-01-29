import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { useImpersonation } from "components/features/impersonation/use-impersonation";
import { usePostHog } from "posthog-js/react";

export function usePosthog() {
  const posthog = usePostHog();
  const { isImpersonating } = useImpersonation();

  const { user } = useAuth0();
  const impersonated_by = getGithubUserIdFromSub(user?.sub) ?? "UNKNOWN";

  function identify(userId: string, properties?: Record<string, unknown>) {
    posthog.identify(userId, properties);
  }

  function capture(eventName: string, properties?: Record<string, unknown>) {
    const props = isImpersonating ? { ...properties, impersonated_by } : properties;
    posthog.capture(eventName, props);
  }

  function reset() {
    posthog.reset();
  }

  return {
    posthog,
    identify,
    capture,
    reset,
  };
}
