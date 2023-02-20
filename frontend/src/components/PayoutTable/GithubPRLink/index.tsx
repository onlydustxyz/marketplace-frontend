import ExternalLink from "src/components/ExternalLink";
import { useIntl } from "src/hooks/useIntl";

export const REGEX_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/(\d+)$/i;

interface LinkProps {
  link: string;
}

export default function GithubPRLink({ link }: LinkProps) {
  const { T } = useIntl();
  let linkText = link;
  const matches = REGEX_GITHUB_PULL_REQUEST_URL.exec(link);
  if (matches !== null) {
    linkText = T("payment.table.githubLink", { pullRequestNumber: matches[1] });
  }
  return (
    <div className="text-spaceBlue-200">
      <ExternalLink text={linkText} url={link} />
    </div>
  );
}
