import classNames from "classnames";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  text?: string;
  url: string;
  numberOfLines?: 1 | 2;
};

export default function ExternalLink({ text, url, numberOfLines = 1 }: Props) {
  return (
    <div
      className={classNames("group/link flex flex-row gap-1 w-fit items-center hover:cursor-pointer", {
        truncate: numberOfLines === 1,
      })}
    >
      <div
        className={classNames("group-hover/link:underline", {
          truncate: numberOfLines === 1,
          "line-clamp-2": numberOfLines === 2,
        })}
        onClick={linkClickHandlerFactory(url)}
      >
        {text || url}
      </div>
      <ExternalLinkLine className="flex text-spacePurple-500 invisible group-hover/link:visible" />
    </div>
  );
}
