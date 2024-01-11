import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import RainbowBanner from "src/components/New/Banners/RainbowBanner";
import { useIntl } from "src/hooks/useIntl";
import { useStackGithubWorkflowClaim } from "src/App/Stacks/Stacks";
import { ClaimUtils } from "src/App/Stacks/GithubWorkflow/ClaimSidePanel/claim.utils";
import { ClaimButton } from "./components/ClaimButton";

export default function ClaimBanner() {
  const { T } = useIntl();
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: project } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectKey } });
  const [openClaimPanel, close] = useStackGithubWorkflowClaim();

  const canDisplay = useMemo(() => {
    return ClaimUtils.canDisplay({ project });
  }, [project]);

  const onBannerClick = () => {
    if (canDisplay) {
      openClaimPanel({ projectSlug: projectKey });
    }
  };

  useEffect(() => {
    if (searchParams?.get("claim_callback") && projectKey) {
      searchParams.delete("claim_callback");
      close();
      openClaimPanel({ projectSlug: projectKey });
      setSearchParams(searchParams);
    }
  }, [searchParams, projectKey]);

  if (!canDisplay) {
    return null;
  }

  return (
    <RainbowBanner
      description={T("project.claim.banner.content", { projectName: project?.name || "" })}
      customButton={<ClaimButton callback={onBannerClick} />}
    />
  );
}
