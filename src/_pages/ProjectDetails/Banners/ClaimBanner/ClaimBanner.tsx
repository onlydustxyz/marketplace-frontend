import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { ClaimUtils } from "src/App/Stacks/GithubWorkflow/ClaimSidePanel/claim.utils";
import { useStackGithubWorkflowClaim } from "src/App/Stacks/Stacks";
import ProjectApi from "src/api/Project";
import RainbowBanner from "src/components/New/Banners/RainbowBanner";
import { useIntl } from "src/hooks/useIntl";

import { useDeleteSearchParams } from "hooks/router/useDeleteSearchParams";

import { ClaimButton } from "./components/ClaimButton";

export default function ClaimBanner() {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const deleteSearchParams = useDeleteSearchParams();
  const { data: project } = ProjectApi.queries.useGetProjectBySlug({ params: { slug } });
  const [openClaimPanel] = useStackGithubWorkflowClaim();
  const isPanelOpen = useRef(false);
  const canDisplay = useMemo(() => {
    return ClaimUtils.canDisplay({ project });
  }, [project]);

  const onBannerClick = () => {
    if (canDisplay) {
      openClaimPanel({ projectSlug: slug });
    }
  };

  useEffect(() => {
    if (searchParams?.has("claim_callback") && slug && !isPanelOpen.current) {
      deleteSearchParams("claim_callback");
      openClaimPanel({ projectSlug: slug });
      isPanelOpen.current = true;
    }
  }, [slug, isPanelOpen]);

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
