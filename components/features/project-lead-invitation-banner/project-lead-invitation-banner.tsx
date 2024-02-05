import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { projectLeadInvitationBannerVariants } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner.variants";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TProjectLeadInvitationBanner } from "./project-lead-invitation-banner.types";

export function ProjectLeadInvitationBanner({
  isLoading,
  onClick,
  projectName,
  btnLabelToken,
  size,
  on = "cards",
}: TProjectLeadInvitationBanner.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const { base, title } = projectLeadInvitationBannerVariants({ size });

  const TitleContent = useMemo(() => {
    if (on === "cards") {
      return <Translate token={"v2.features.banners.projectLeadInvitation.prompt"} params={{ projectName }} />;
    }
    return <Translate token={"v2.features.banners.projectLeadInvitation.card.prompt"} />;
  }, [on]);

  const ButtonLabel = useMemo(() => {
    if (btnLabelToken) {
      return <Translate token={btnLabelToken} />;
    }

    if (isMd) {
      return <Translate token={"v2.features.banners.projectLeadInvitation.accept"} />;
    }

    return <Translate token={"v2.features.banners.projectLeadInvitation.acceptShort"} />;
  }, [btnLabelToken]);

  return (
    <div className={cn(base())}>
      <div className={cn(title())}>{TitleContent}</div>
      <Button size={size} onClick={onClick} disabled={isLoading}>
        {size === "l" ? <Icon remixName="ri-check-line" size={20} className="text-black" /> : null}
        {ButtonLabel}
      </Button>
    </div>
  );
}
