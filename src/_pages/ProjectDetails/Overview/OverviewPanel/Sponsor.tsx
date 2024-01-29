import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { Maybe } from "src/types";

import { Link } from "components/ds/link/link";

type Props = {
  name: string | null;
  logoUrl: string | null;
  externalUrl: Maybe<string>;
};

export default function Sponsor({ name, logoUrl, externalUrl }: Props) {
  return (
    <div className="flex flex-row items-center gap-2 text-sm font-normal">
      <RoundedImage alt={name} rounding={Rounding.Circle} size={ImageSize.Sm} src={logoUrl} />
      {externalUrl ? <Link href={externalUrl}>{name}</Link> : name}
    </div>
  );
}
