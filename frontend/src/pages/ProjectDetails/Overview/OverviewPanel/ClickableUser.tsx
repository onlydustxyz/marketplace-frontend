import ExternalLink from "src/components/ExternalLink";

type Props = {
  name: string;
  url?: string;
  logoUrl: string;
};

export default function ClickableUser({ name, url, logoUrl }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center text-greyscale-50 truncate text-sm font-normal">
      <img src={logoUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
      {url ? <ExternalLink {...{ url, text: name }} /> : <>{name}</>}
    </div>
  );
}
