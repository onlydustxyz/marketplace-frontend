import { FC } from "react";
import { CustomIconsName } from "./icon.type";
import { DollarIcon } from "./icons/dollar";

export interface CustomIconProps {
  name?: CustomIconsName;
}

export const CustomIcon: FC<CustomIconProps> = ({ name }) => {
  const customIcons: { [key in CustomIconsName]: JSX.Element } = {
    dollar: <DollarIcon />,
  };

  return <>{customIcons[name as CustomIconsName]}</>;
};
