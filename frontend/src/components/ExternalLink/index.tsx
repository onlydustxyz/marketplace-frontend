import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  text?: string;
  url: string;
};

export default function ExternalLink({ text, url }: Props) {
  return (
    <div className="group/link flex flex-row gap-1 w-fit items-center hover:cursor-pointer">
      <div className={"flex group-hover/link:underline"} onClick={linkClickHandlerFactory(url)}>
        {text || url}
      </div>
      <ExternalLinkLine className="flex text-spacePurple-500 invisible group-hover/link:visible" />
    </div>
  );
}
