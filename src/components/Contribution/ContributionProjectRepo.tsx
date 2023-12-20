import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { ShortProject, ShortRepo } from "src/types";

export function ContributionProjectRepo({ project, repo }: { project: ShortProject; repo: ShortRepo }) {
  const [openProjectOverview] = useStackProjectOverview();

  const onClickProject = () => {
    openProjectOverview({ slug: project.slug });
  };

  return (
    <div className="flex items-center gap-3">
      <RoundedImage
        src={project.logoUrl}
        alt={project.name}
        rounding={Rounding.Corners}
        size={ImageSize.Sm}
        useLogoFallback
      />

      <div className="text-sm">
        <button onClick={onClickProject} className="hover:underline">
          {project.name}
        </button>
        &nbsp;<span className="text-spaceBlue-300">/</span>&nbsp;
        <span className="inline-flex">
          <ExternalLink url={repo.htmlUrl} text={repo.name} />
        </span>
      </div>
    </div>
  );
}
