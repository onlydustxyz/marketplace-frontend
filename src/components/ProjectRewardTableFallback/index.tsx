import { components } from "src/__generated/api";
import { RewardProjectButton } from "src/_pages/ProjectDetails/components/RewardProjectButton";
import { IMAGES } from "src/assets/img";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

interface Props {
  project: components["schemas"]["ProjectResponse"];
  activeFilter?: boolean;
  activeFilterButtonEvent?: () => void;
}

const ProjectRewardTableFallback = ({ project, activeFilter = false, activeFilterButtonEvent }: Props) => {
  const { T } = useIntl();
  return (
    <div
      className={cn("flex w-full flex-col items-center gap-8 p-2", {
        "pt-8": activeFilter,
      })}
    >
      <div className="w-36">
        <img
          src={activeFilter ? IMAGES.icons.compass : IMAGES.global.payment}
          loading="lazy"
          alt={T("project.details.tableFallback.payment")}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-belwe text-2xl leading-8 text-greyscale-50">
          {activeFilter
            ? T("project.details.tableFallback.withFilter.title")
            : T("project.details.tableFallback.noRewards")}
        </span>
        <span className="font-walsheim text-base leading-6 text-greyscale-50">
          {activeFilter
            ? T("project.details.tableFallback.withFilter.message")
            : T("project.details.tableFallback.send")}
        </span>
      </div>
      {!activeFilter ? <RewardProjectButton project={project} size={ButtonSize.Lg} /> : null}
      {activeFilter && activeFilterButtonEvent ? (
        <Button
          onBackground={ButtonOnBackground.Blue}
          className="flex-1 md:flex-initial"
          size={ButtonSize.Lg}
          onClick={activeFilterButtonEvent}
        >
          {T("project.details.tableFallback.withFilter.buttonLabel")}
        </Button>
      ) : null}
    </div>
  );
};

export default ProjectRewardTableFallback;
