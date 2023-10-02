import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import ExternalLink from "src/components/ExternalLink";
import { Maybe } from "src/__generated/graphql";

type Props = {
  name: string;
  logoUrl: string;
  externalUrl: Maybe<string>;
};

export default function Sponsor({ name, logoUrl, externalUrl }: Props) {
  return (
    <div className="flex flex-row items-center gap-2 text-sm font-normal">
      <RoundedImage alt={name} rounding={Rounding.Circle} size={ImageSize.Sm} src={logoUrl} />
      {externalUrl ? <ExternalLink url={externalUrl} text={name} /> : name}
    </div>
  );
}
