import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { ShortProject, ShortRepo } from "src/types";

import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";

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
        <Link.Button onClick={onClickProject}>{project.name}</Link.Button>
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
