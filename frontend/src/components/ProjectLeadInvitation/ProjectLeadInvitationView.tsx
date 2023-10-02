import { viewportConfig } from "src/config";
import CheckLine from "src/icons/CheckLine";
import { useT } from "talkr";
import { useMediaQuery } from "usehooks-ts";
import Button, { ButtonSize } from "src/components/Button";
import classNames from "classnames";

export enum CalloutSizes {
  Small,
  Medium,
  Large,
}

const ButtonsSizes = {
  [CalloutSizes.Small]: ButtonSize.Sm,
  [CalloutSizes.Medium]: ButtonSize.Md,
  [CalloutSizes.Large]: ButtonSize.Lg,
};

interface ProjectLeadInvitationProps {
  projectName?: string | null;
  size?: CalloutSizes;
  btnLabel?: string;
  onClick?: () => void;
}

export default function ProjectLeadInvitationView({
  projectName,
  size = CalloutSizes.Small,
  btnLabel,
  onClick,
}: ProjectLeadInvitationProps) {
  const { T } = useT();
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  return (
    <div
      className={classNames(
        "relative flex flex-row items-center justify-between gap-5 overflow-hidden rounded-xl text-center font-medium sm:flex-row",
        "bg-rainbow animate-wave after:pointer-events-none after:absolute after:h-full after:w-full after:bg-noise-light",
        {
          "mh-[60px] p-3": size === CalloutSizes.Small,
          "mh-[80px] p-4": size === CalloutSizes.Medium,
          "mh-[96px] p-6": size === CalloutSizes.Large,
        }
      )}
    >
      <div
        className={classNames("flex flex-1 text-left font-walsheim text-base sm:flex-auto", {
          "text-sm": size === CalloutSizes.Small,
          "text-md": size === CalloutSizes.Medium,
          "text-lg": size === CalloutSizes.Large,
        })}
      >
        {projectName ? T("projectLeadInvitation.prompt", { projectName }) : T("project.projectLeadInvitation.prompt")}
      </div>
      <Button size={ButtonsSizes[size]} onClick={onClick} data-testid="accept-invite-button flex-1 sm:flex-auto">
        {size === CalloutSizes.Large ? <CheckLine className="text-xl font-normal text-black" /> : null}
        {btnLabel ? (
          btnLabel
        ) : (
          <div>{T(isMd ? "projectLeadInvitation.accept" : "projectLeadInvitation.acceptShort")}</div>
        )}
      </Button>
    </div>
  );
}
