import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { GithubRepos, Projects } from "src/__generated/graphql";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";

export function ContributionProjectRepo({
  project,
  repo,
}: {
  project: Pick<Projects, "key" | "logoUrl" | "name">;
  repo: Pick<GithubRepos, "htmlUrl" | "name">;
}) {
  return (
    <div className="flex items-center gap-3">
      <RoundedImage
        src={project.logoUrl ?? onlyDustLogo}
        alt={project.name ?? ""}
        rounding={Rounding.Corners}
        size={ImageSize.Sm}
      />

      <p className="text-sm">
        <Link
          to={generatePath(RoutePaths.ProjectDetails, {
            projectKey: project.key ?? "",
          })}
          className="hover:underline"
        >
          {project.name}
        </Link>
        &nbsp;<span className="text-spaceBlue-300">/</span>&nbsp;
        <span className="inline-flex">
          <ExternalLink url={repo?.htmlUrl ?? ""} text={repo.name} />
        </span>
      </p>
    </div>
  );
}
