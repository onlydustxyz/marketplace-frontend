import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  text?: string;
  url: string;
};

export default function GithubPullRequestLink({ text, url }: Props) {
  return (
    <span className={"group/link hover:cursor-pointer"}>
      <span className={"align-top group-hover/link:underline"} onClick={linkClickHandlerFactory(url)}>
        {text || url}
      </span>
      <span className="ml-1 align-top">
        <ExternalLinkLine className="invisible text-spacePurple-500 group-hover/link:visible" />
      </span>
    </span>
  );
}
