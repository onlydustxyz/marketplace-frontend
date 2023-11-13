import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";

function handleNavigation(searchParams: URLSearchParams, navigate: (path: string) => void) {
  const installationId = searchParams.get("installation_id");
  const state = searchParams.get("state");

  if (installationId && !state) {
    navigate(`${RoutePaths.ProjectCreation}/organizations?installation_id=${installationId}`);
  } else if (installationId && state) {
    navigate(`/p/${state}/edit?installation_id=${installationId}`);
  }
}

export default function GithubCallbackHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleNavigation(searchParams, navigate);
  }, [searchParams, navigate]);

  if (!searchParams.has("installation_id") && !searchParams.has("state")) {
    navigate(RoutePaths.Home);
  }

  return null;
}
