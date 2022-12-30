import foxLogo from "assets/img/fox.png";
import { useT } from "talkr";

interface ProjectPaymentTableFallbackProps {
  onClick: () => void;
}

export default function ProjectPaymentTableFallback({ onClick }: ProjectPaymentTableFallbackProps) {
  const { T } = useT();
  return (
    <div className="flex flex-col items-center gap-8 p-4 w-full">
      <div className="w-64">
        <img src={foxLogo} />
      </div>
      <div className="flex flex-col text-lg items-center gap-2">
        <div>{T("project.details.tableFallback.noPayments")}</div>
        <div>{T("project.details.tableFallback.send")}</div>
      </div>
      <div className="bg-neutral-50 rounded-xl p-6">
        <div className="text-2xl text-black hover:cursor-pointer" onClick={onClick}>
          {T("project.details.tableFallback.sendPayment")}
        </div>
      </div>
    </div>
  );
}
