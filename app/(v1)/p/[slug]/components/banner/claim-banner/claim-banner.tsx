import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { ClaimUtils } from "src/App/Stacks/GithubWorkflow/ClaimSidePanel/claim.utils";
import { useStackGithubWorkflowClaim } from "src/App/Stacks/Stacks";

import { Banner } from "components/ds/banner/banner";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useDeleteSearchParams } from "hooks/router/useDeleteSearchParams";

import { TClaimBanner } from "./claim-banner.types";

export function ClaimBanner({ project }: TClaimBanner.Props) {
  const { slug = "" } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const deleteSearchParams = useDeleteSearchParams();
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  const isPanelOpen = useRef(false);
  const [openClaimPanel] = useStackGithubWorkflowClaim();

  const canDisplay = useMemo(() => {
    return ClaimUtils.canDisplay({ project });
  }, [project]);

  const onBannerClick = async () => {
    if (isAuthenticated) {
      if (canDisplay) {
        openClaimPanel({ projectSlug: slug });
      }
    } else {
      router.push(NEXT_ROUTER.signup.root);
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
    <Banner
      title={
        <Translate
          token="v2.features.banners.claim.content"
          params={{
            projectName: project.name,
          }}
        />
      }
      variant="rainbow"
      button={{
        onClick: onBannerClick,
        size: "s",
        children: (
          <>
            <Icon remixName="ri-magic-line" size={20} />
            <Translate token="v2.features.banners.claim.button" />
          </>
        ),
      }}
    />
  );
}
