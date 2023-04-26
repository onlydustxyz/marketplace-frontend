import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  text?: string;
  url: string;
};

export default function GithubIssueLink({ text, url }: Props) {
  return (
    <span className={"group/link hover:cursor-pointer"}>
      <span className={"group-hover/link:underline align-top mt-1"} onClick={linkClickHandlerFactory(url)}>
        {text || url}
      </span>
      <span className="align-top mt-1 ml-1">
        <ExternalLinkLine className="text-spacePurple-500 invisible group-hover/link:visible" />
      </span>
    </span>
  );
}
