import { useIntl } from "src/hooks/useIntl";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

export const REGEX_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/(\d+)$/i;

interface LinkProps {
  link: string;
  linkColor?: LinkColor;
}

export enum LinkColor {
  Grey = "text-spaceBlue-200",
}

export default function GithubPRLink({ link, linkColor }: LinkProps) {
  const { T } = useIntl();
  let linkText = link;
  const matches = REGEX_GITHUB_PULL_REQUEST_URL.exec(link);
  if (matches !== null) {
    linkText = T("payment.table.githubLink", { pullRequestNumber: matches[1] });
  }
  return (
    <div className="group/github-pr-link flex flex-row gap-1 w-fit items-center hover:cursor-pointer">
      <div className={`${linkColor} flex group-hover/github-pr-link:underline`} onClick={linkClickHandlerFactory(link)}>
        {linkText}
      </div>
      <ExternalLinkLine className="flex text-spacePurple-500 invisible group-hover/github-pr-link:visible" />
    </div>
  );
}
