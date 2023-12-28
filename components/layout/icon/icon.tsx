import { FC } from "react";
import { cn } from "src/utils/cn";
import { CustomIconsName, RemixIconsName } from "./icon.type";
import { CustomIcon } from "./custom-icon";

interface BaseProps {
  size?: number;
  color?: string;
  className?: string;
}

interface CustomIconProps extends BaseProps {
  customName: CustomIconsName;
  remixName?: never;
}

interface RemixIconProps extends BaseProps {
  remixName: RemixIconsName;
  customName?: never;
}

type IconProps = CustomIconProps | RemixIconProps;

export const Icon: FC<IconProps> = ({ customName, remixName, size = 16, color = "currentColor", className }) => {
  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      {customName ? <CustomIcon name={customName} size={size} color={color} /> : null}

      {remixName ? (
        <i
          className={cn(remixName)}
          style={{
            fontSize: `${size}px`,
            color,
          }}
        />
      ) : null}
    </span>
  );
};
