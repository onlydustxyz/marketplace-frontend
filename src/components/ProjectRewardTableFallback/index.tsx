import { RewardProjectButton } from "src/pages/ProjectDetails/components/RewardProjectButton";
import { components } from "src/__generated/api";
import { ButtonSize } from "src/components/Button";
import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";

interface Props {
  project: components["schemas"]["ProjectResponse"];
}

const ProjectRewardTableFallback = ({ project }: Props) => {
  const { T } = useIntl();
  return (
    <div className="flex w-full flex-col items-center gap-8 p-2">
      <div className="w-36">
        <img src={IMAGES.global.payment} loading="lazy" alt={T("project.details.tableFallback.payment")} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-belwe text-2xl leading-8 text-greyscale-50">
          {T("project.details.tableFallback.noRewards")}
        </span>
        <span className="font-walsheim text-base leading-6 text-greyscale-50">
          {T("project.details.tableFallback.send")}
        </span>
      </div>
      <RewardProjectButton project={project} size={ButtonSize.Lg} />
    </div>
  );
};

export default ProjectRewardTableFallback;
