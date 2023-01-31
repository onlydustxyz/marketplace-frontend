import atomLogo from "assets/img/atom.png";
import { useT } from "talkr";

type Props = {
  projectName?: string;
};

export default function ContributorsTableFallback({ projectName }: Props) {
  const { T } = useT();
  return (
    <div className="h-110 border-dashed border border-greyscale-50/12 rounded-2xl">
      <div className="flex flex-col items-center justify-center space-y-4 pt-36">
        <div className="w-24">
          <img src={atomLogo}></img>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-base font-walsheim font-medium text-greyscale-50 leading-5">
            {T("contributor.tableFallback.noContributor", { projectName })}
          </span>
          <span className="text-sm font-walsheim text-greyscale-300 leading-4">
            {T("contributor.tableFallback.relevantProfiles")}
          </span>
        </div>
      </div>
    </div>
  );
}
