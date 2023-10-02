import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  text?: string;
  url: string;
};

export default function ExternalLink({ text, url }: Props) {
  return (
    <div className={"group/link flex flex-row items-center gap-1 truncate hover:cursor-pointer"}>
      <div className={"truncate group-hover/link:underline"} onClick={linkClickHandlerFactory(url)}>
        {text || url}
      </div>
      <ExternalLinkLine className="invisible text-spacePurple-500 group-hover/link:visible" />
    </div>
  );
}
