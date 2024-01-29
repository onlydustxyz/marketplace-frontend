import { TCustomIcon } from "./custom-icon.types";
import { ArrowIcon } from "./icons/arrow";
import { DollarIcon } from "./icons/dollar";
import { GalleryLineIcon } from "./icons/gallery-line";
import { TechnologyIcon } from "./icons/technology";

export function CustomIcon({ name, ...props }: TCustomIcon.Props) {
  const customIcons: { [key in TCustomIcon.Names]: JSX.Element } = {
    dollar: <DollarIcon {...props} />,
    technology: <TechnologyIcon {...props} />,
    galleryLine: <GalleryLineIcon {...props} />,
    arrow: <ArrowIcon {...props} />,
  };

  return <>{customIcons[name as TCustomIcon.Names]}</>;
}
