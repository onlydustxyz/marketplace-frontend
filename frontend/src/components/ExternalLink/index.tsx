import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  text?: string;
  url: string;
};

export default function ExternalLink({ text, url }: Props) {
  return (
    <div className={"group/link hover:cursor-pointer flex flex-row gap-1 items-center truncate"}>
      <div className={"group-hover/link:underline truncate"} onClick={linkClickHandlerFactory(url)}>
        {text || url}
      </div>
      <ExternalLinkLine className="text-spacePurple-500 invisible group-hover/link:visible" />
    </div>
  );
}
