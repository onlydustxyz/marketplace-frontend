import { HTMLProps } from "react";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { cn } from "src/utils/cn";

type Props = {
  text?: string | null;
  url: string;
  anchorProps?: HTMLProps<HTMLAnchorElement>;
};

export default function ExternalLink({ text, url, anchorProps }: Props) {
  const { className: anchorClassName, ...restAnchorProps } = anchorProps ?? {};

  return (
    <div className="group/link flex items-center gap-1 truncate">
      <a
        href={url}
        target="_blank"
        className={cn("truncate group-hover/link:underline", anchorClassName)}
        rel="noopener noreferrer"
        {...restAnchorProps}
      >
        {text || url}
      </a>
      <ExternalLinkLine className="invisible text-spacePurple-500 group-hover/link:visible" />
    </div>
  );
}
