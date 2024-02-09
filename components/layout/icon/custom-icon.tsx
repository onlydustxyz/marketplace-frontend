import { VerifiedIcon } from "components/layout/icon/icons/verified";

import { TCustomIcon } from "./custom-icon.types";
import { ArrowIcon } from "./icons/arrow";
import { DollarIcon } from "./icons/dollar";
import { GalleryLineIcon } from "./icons/gallery-line";
import { TechnologyIcon } from "./icons/technology";
import { WhaleIcon } from "./icons/whale";

export function CustomIcon({ name, ...props }: TCustomIcon.Props) {
  const customIcons: { [key in TCustomIcon.Names]: JSX.Element } = {
    dollar: <DollarIcon {...props} />,
    technology: <TechnologyIcon {...props} />,
    galleryLine: <GalleryLineIcon {...props} />,
    arrow: <ArrowIcon {...props} />,
    whale: <WhaleIcon {...props} />,
    verified: <VerifiedIcon {...props} />,
  };

  return <>{customIcons[name as TCustomIcon.Names]}</>;
}
