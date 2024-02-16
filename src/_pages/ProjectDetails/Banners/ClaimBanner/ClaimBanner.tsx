import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ClaimUtils } from "src/App/Stacks/GithubWorkflow/ClaimSidePanel/claim.utils";
import { useStackGithubWorkflowClaim } from "src/App/Stacks/Stacks";
import ProjectApi from "src/api/Project";
import RainbowBanner from "src/components/New/Banners/RainbowBanner";
import { useIntl } from "src/hooks/useIntl";

import { ClaimButton } from "./components/ClaimButton";

export default function ClaimBanner() {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: project } = ProjectApi.queries.useGetProjectBySlug({ params: { slug } });
  const [openClaimPanel, close] = useStackGithubWorkflowClaim();

  const canDisplay = useMemo(() => {
    return ClaimUtils.canDisplay({ project });
  }, [project]);

  const onBannerClick = () => {
    if (canDisplay) {
      openClaimPanel({ projectSlug: slug });
    }
  };

  useEffect(() => {
    if (searchParams?.get("claim_callback") && slug) {
      searchParams.delete("claim_callback");
      close();
      openClaimPanel({ projectSlug: slug });
      setSearchParams(searchParams);
    }
  }, [searchParams, slug]);

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
