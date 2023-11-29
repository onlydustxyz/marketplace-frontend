import { HTMLProps, ReactNode } from "react";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { cn } from "src/utils/cn";

type Props = {
  text?: string | null;
  url: string;
  anchorProps?: HTMLProps<HTMLAnchorElement>;
  withIcon?: ({ className }: { className: string }) => ReactNode;
};

export default function ExternalLink({ text, url, anchorProps, withIcon }: Props) {
  const { className: anchorClassName, ...restAnchorProps } = anchorProps ?? {};

  return (
    <div className="group/link flex items-center gap-1 truncate">
      {withIcon && withIcon({ className: "w-3.5 h-3.5 text-spacePurple-500" })}
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
