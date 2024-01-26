import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";
import { useStackProjectOverview } from "src/App/Stacks/Stacks";
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

      <div>
        <Link onClick={onClickProject}>{project.name}</Link>
        &nbsp;
        <Typography variant="body-s" as="span" className="text-spaceBlue-300">
          /
        </Typography>
        &nbsp;
        <Link href={repo.htmlUrl}>{repo.name}</Link>
      </div>
    </div>
  );
}
