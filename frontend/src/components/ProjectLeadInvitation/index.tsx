import CheckMark from "src/assets/icons/CheckMark";
import headerElementBackground from "src/assets/img/header-element-background.png";
import Card from "src/components/Card";

interface ProjectLeadInvitationProps {
  projectName: string;
  onClick: () => void;
}

export default function ProjectLeadInvitation({ projectName, onClick }: ProjectLeadInvitationProps) {
  return (
    <Card
      backgroundImageUrl={headerElementBackground}
      className="backdrop-blur-none bg-opacity-10 border-none"
      backgroundImageClassName="bg-no-repeat bg-cover"
    >
      <div className="flex flex-row justify-between items-center font-medium px-3 py-1 text-lg">
        <div>{`You’ve been promoted to Project Lead on ${projectName}`}</div>
        <div
          onClick={onClick}
          className="flex flex-row justify-between items-center gap-5 w-fit rounded-xl bg-neutral-100 shadow-inner shadow-neutral-400 px-4 py-3 text-black hover:cursor-pointer"
        >
          <CheckMark className="fill-black h-5 w-5" />
          <div>Accept invite</div>
        </div>
      </div>
    </Card>
  );
}
