import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "../../../src/config.ts";
import { cn } from "../../../src/utils/cn.ts";
import { Button } from "../../ds/button/button.tsx";
import CheckLine from "../../../src/icons/CheckLine.tsx";
import { projectLeadInvitationBannerVariants } from "@/components/features/project-lead-Invitation-banner/project-lead-Invitation-banner.variant.ts";
import { useMemo } from "react";
import Translate from "@/components/layout/translate/translate.tsx";
import { ProjectLeadInvitationProps } from "@/components/features/project-lead-Invitation-banner/project-lead-Invitation-banner.type.ts";

export default function ProjectLeadInvitationBanner({
  isLoading,
  onClick,
  projectName,
  btnLabel,
  size,
  on = "cards",
}: ProjectLeadInvitationProps) {
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
