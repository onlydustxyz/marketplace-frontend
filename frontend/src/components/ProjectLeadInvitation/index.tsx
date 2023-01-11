import headerElementBackground from "src/assets/img/header-element-background.png";
import Card from "src/components/Card";
import CheckLine from "src/icons/CheckLine";
import { useT } from "talkr";

interface ProjectLeadInvitationProps {
  projectName: string;
  onClick: () => void;
}

export default function ProjectLeadInvitation({ projectName, onClick }: ProjectLeadInvitationProps) {
  const { T } = useT();
  return (
    <Card
      backgroundImageUrl={headerElementBackground}
      className="backdrop-blur-none bg-opacity-10 border-none"
      backgroundImageClassName="bg-no-repeat bg-cover"
    >
      <div className="flex flex-row justify-between items-center font-medium px-3 py-1">
        <div className="text-lg">{T("projectLeadInvitation.prompt", { projectName })}</div>
        <div
          onClick={onClick}
          className="flex flex-row justify-between items-center gap-2 w-fit rounded-xl bg-neutral-100 shadow-inner shadow-neutral-400 px-4 py-3 text-black hover:cursor-pointer"
        >
          <CheckLine className="text-black font-normal text-xl" />
          <div>{T("projectLeadInvitation.accept")}</div>
        </div>
      </div>
    </Card>
  );
}
