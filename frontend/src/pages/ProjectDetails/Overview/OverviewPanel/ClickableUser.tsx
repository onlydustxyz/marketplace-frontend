import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";

type Props = {
  name: string;
  url: string | null;
  logoUrl: string | null;
};

export default function ClickableUser({ name, url, logoUrl }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center text-greyscale-50 text-sm font-normal">
      {logoUrl && <RoundedImage alt={name} rounding={Rounding.Circle} size={ImageSize.Small} src={logoUrl} />}
      <div className="truncate">{url ? <ExternalLink {...{ url, text: name }} /> : <>{name}</>}</div>
    </div>
  );
}
