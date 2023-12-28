import { FC } from "react";
import { CustomIconsName } from "./custom-icon-names.type";
import { DollarIcon } from "./icons/dollar";

export interface BaseProps {
  size?: number;
  color?: string;
}

interface CustomIconProps extends BaseProps {
  name?: CustomIconsName;
}

export const CustomIcon: FC<CustomIconProps> = ({ name, ...props }) => {
  const customIcons: { [key in CustomIconsName]: JSX.Element } = {
    dollar: <DollarIcon {...props} />,
  };

  return <>{customIcons[name as CustomIconsName]}</>;
};
