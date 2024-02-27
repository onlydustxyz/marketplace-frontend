import dynamic from "next/dynamic";

import { TCustomIcon } from "./custom-icon.types";

const ArrowIcon = dynamic(() => import("./icons/arrow").then(mod => mod.ArrowIcon));
const DollarIcon = dynamic(() => import("./icons/dollar").then(mod => mod.DollarIcon));
const GalleryLineIcon = dynamic(() => import("./icons/gallery-line").then(mod => mod.GalleryLineIcon));
const TechnologyIcon = dynamic(() => import("./icons/technology").then(mod => mod.TechnologyIcon));
const WhaleIcon = dynamic(() => import("./icons/whale").then(mod => mod.WhaleIcon));
const VerifiedIcon = dynamic(() => import("components/layout/icon/icons/verified").then(mod => mod.VerifiedIcon));

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
