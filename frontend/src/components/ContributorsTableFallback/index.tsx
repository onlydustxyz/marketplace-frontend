import atomLogo from "assets/img/atom.png";
import { useT } from "talkr";

type Props = {
  projectName?: string;
};

export default function ContributorsTableFallback({ projectName }: Props) {
  const { T } = useT();
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-full">
      <div className="w-24">
        <img src={atomLogo}></img>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <span className="text-lg leading-5">{T("contributor.tableFallback.noContributor", { projectName })}</span>
        <span className="text-sm leading-4 text-gray-500">{T("contributor.tableFallback.relevantProfiles")}</span>
      </div>
    </div>
  );
}
