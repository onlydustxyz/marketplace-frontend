import ExternalLinkLine from "src/icons/ExternalLinkLine";

type Props = {
  text?: string;
  url: string;
};

export function GithubLink({ text, url }: Props) {
  return (
    <span className={"group/link hover:cursor-pointer"}>
      <a className={"align-top group-hover/link:underline"} href={url} target="_blank" rel="noreferrer">
        {text || url}
      </a>
      <span className="ml-1 align-top">
        <ExternalLinkLine className="invisible text-spacePurple-500 group-hover/link:visible" />
      </span>
    </span>
  );
}
