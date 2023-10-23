import ExternalLinkLine from "src/icons/ExternalLinkLine";

type Props = {
  text?: string | null;
  url: string;
};

export default function ExternalLink({ text, url }: Props) {
  return (
    <div className="group/link flex items-center gap-1 truncate">
      <a href={url} target="_blank" className="truncate group-hover/link:underline" rel="noopener noreferrer">
        {text || url}
      </a>
      <ExternalLinkLine className="invisible text-spacePurple-500 group-hover/link:visible" />
    </div>
  );
}
