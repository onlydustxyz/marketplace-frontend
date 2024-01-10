import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config.ts";
import { cn } from "src/utils/cn.ts";
import { Button } from "@/components/ds/button/button.tsx";
import CheckLine from "src/icons/CheckLine.tsx";
import { projectLeadInvitationBannerVariants } from "@/components/features/project-lead-Invitation-banner/project-lead-Invitation-banner.variants";
import { useMemo } from "react";
import Translate from "@/components/layout/translate/translate.tsx";
import { TProjectLeadInvitationBanner } from "./project-lead-Invitation-banner.types";

export function ProjectLeadInvitationBanner({
  isLoading,
  onClick,
  projectName,
  btnLabel,
  size,
  on = "cards",
}: TProjectLeadInvitationBanner.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const { base, title } = projectLeadInvitationBannerVariants({ size });
  // const { mutate, ...rest } = MeApi.mutations.useAcceptProjectLeaderInvitation({
  //   params: { projectId, projectSlug },
  // });
  //
  // const onAcceptInvite = () => {
  //   mutate(null);
  // };
  //
  // useMutationAlert({
  //   mutation: rest,
  //   success: {
  //     message: T("projectLeadInvitation.success", { projectName }),
  //   },
  //   error: {
  //     default: true,
  //   },
  // });

  const TitleContent = useMemo(() => {
    if (on === "cards") {
      return <Translate token={"projectLeadInvitation.prompt"} params={{ projectName }} />;
    }
    return <Translate token={"projectLeadInvitation.card.prompt"} />;
  }, [on]);

  const ButtonLabel = useMemo(() => {
    if (btnLabel) {
      return btnLabel;
    }

    if (isMd) {
      return <Translate token={"projectLeadInvitation.accept"} />;
    }
    return <Translate token={"projectLeadInvitation.acceptShort"} />;
  }, [btnLabel]);

  return (
    <div className={cn(base())}>
      <div className={cn(title())}>{TitleContent}</div>
      <Button size={size} onClick={onClick} disabled={isLoading}>
        {size === "l" ? <CheckLine className="text-xl font-normal text-black" /> : null}
        {ButtonLabel}
      </Button>
    </div>
  );
}
