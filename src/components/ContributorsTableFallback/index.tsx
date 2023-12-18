import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";
import { Maybe } from "src/types";

type Props = {
  projectName: Maybe<string>;
};

export default function ContributorsTableFallback({ projectName }: Props) {
  const { T } = useIntl();

  return (
    <div className="h-110 rounded-2xl border border-dashed border-greyscale-50/12">
      <div className="flex flex-col items-center justify-center space-y-4 pt-36">
        <div className="w-24">
          <img src={IMAGES.icons.atom} loading="lazy" alt={T("common.icons.atom")} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-walsheim text-base font-medium leading-5 text-greyscale-50">
            {T("contributor.tableFallback.noContributor", { projectName })}
          </span>
          <span className="font-walsheim text-sm leading-4 text-greyscale-300">
            {T("contributor.tableFallback.relevantProfiles")}
          </span>
        </div>
      </div>
    </div>
  );
}
