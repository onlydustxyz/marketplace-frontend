import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { Contribution } from "src/types";

export function ContributionProjectRepo({ contribution }: { contribution: Contribution }) {
  const { project, repo } = contribution;

  return (
    <div className="flex items-center gap-3">
      <RoundedImage
        src={project.logoUrl ?? onlyDustLogo}
        alt={project.name}
        rounding={Rounding.Corners}
        size={ImageSize.Sm}
      />

      <div className="text-sm">
        <Link
          to={generatePath(RoutePaths.ProjectDetails, {
            projectKey: project.slug ?? "",
          })}
          className="hover:underline"
        >
          {project.name}
        </Link>
        &nbsp;<span className="text-spaceBlue-300">/</span>&nbsp;
        <span className="inline-flex">
          <ExternalLink url={repo.htmlUrl} text={repo.name} />
        </span>
      </div>
    </div>
  );
}
