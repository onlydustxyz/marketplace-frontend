import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { ButtonSize } from "src/components/Button";
import RainbowBanner from "src/components/New/Banners/RainbowBanner";
import { useIntl } from "src/hooks/useIntl";
import { useStackGithubWorkflowClaim } from "src/App/Stacks/Stacks";
import { ClaimUtils } from "src/App/Stacks/GithubWorkflow/ClaimSidePanel/claim.utils";

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
    if (searchParams?.get("claim_callback")) {
      searchParams.delete("claim_callback");
      close();
      openClaimPanel();
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  if (!canDisplay) {
    return null;
  }

  return (
    <RainbowBanner
      description={T("project.claim.banner.content", { projectName: project?.name || "" })}
      button={{
        name: T("project.claim.banner.button"),
        icon: <i className="ri-magic-line text-xl font-normal text-black" />,
        onClick: onBannerClick,
        size: ButtonSize.Sm,
      }}
    />
  );
}
