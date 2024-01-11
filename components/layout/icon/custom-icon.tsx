import { DollarIcon } from "./icons/dollar";
import { TechnologyIcon } from "./icons/technology";
import { TCustomIcon } from "./custom-icon.types";
import { GalleryLineIcon } from "./icons/gallery-line";
import { ArrowIcon } from "./icons/arrow";

export function CustomIcon({ name, ...props }: TCustomIcon.Props) {
  const customIcons: { [key in TCustomIcon.Names]: JSX.Element } = {
    dollar: <DollarIcon {...props} />,
    technology: <TechnologyIcon {...props} />,
    "gallery-line": <GalleryLineIcon {...props} />,
    arrow: <ArrowIcon {...props} />,
  };

  return <>{customIcons[name as TCustomIcon.Names]}</>;
}
