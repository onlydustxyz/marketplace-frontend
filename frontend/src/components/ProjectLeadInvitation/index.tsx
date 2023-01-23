import headerElementBackground from "src/assets/img/header-element-background.png";
import ImageCard, { BackgroundSize } from "src/components/ImageCard";
import CheckLine from "src/icons/CheckLine";
import { useT } from "talkr";

interface ProjectLeadInvitationProps {
  projectName?: string;
  onClick: () => void;
}

export default function ProjectLeadInvitation({ projectName, onClick }: ProjectLeadInvitationProps) {
  const { T } = useT();
  return (
    <ImageCard backgroundImageUrl={headerElementBackground} backgroundSize={BackgroundSize.Cover}>
      <div className="flex flex-row justify-between items-center font-medium px-6 py-5">
        <div className="text-lg">{T("projectLeadInvitation.prompt", { projectName })}</div>
        <div
          onClick={onClick}
          className="flex flex-row justify-between items-center gap-2 w-fit rounded-xl bg-neutral-100 shadow-inner shadow-neutral-400 px-4 py-3 text-black hover:cursor-pointer"
          data-testid="accept-invite-button"
        >
          <CheckLine className="text-black font-normal text-xl" />
          <div>{T("projectLeadInvitation.accept")}</div>
        </div>
      </div>
    </ImageCard>
  );
}
