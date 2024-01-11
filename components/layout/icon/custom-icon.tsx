import { DollarIcon } from "./icons/dollar";
import { TechnologyIcon } from "./icons/technology";
import { TCustomIcon } from "./custom-icon.types";

export function CustomIcon({ name, ...props }: TCustomIcon.Props) {
  const customIcons: { [key in TCustomIcon.Names]: JSX.Element } = {
    dollar: <DollarIcon {...props} />,
    technology: <TechnologyIcon {...props} />,
  };

  return <>{customIcons[name as TCustomIcon.Names]}</>;
}
