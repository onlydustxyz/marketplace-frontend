import { BaseHTMLAttributes, FC } from "react";
import { cn } from "src/utils/cn";
import { CustomIcon } from "./custom-icon";
import { CustomIconsName } from "./custom-icon-names.type";
import { RemixIconsName } from "./remix-icon-names.type";

type HtmlDiv = Omit<BaseHTMLAttributes<HTMLDivElement>, "type">;

interface BaseProps extends HtmlDiv {
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

export const Icon: FC<IconProps> = ({
  customName,
  remixName,
  size = 16,
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <span className={cn("inline-flex items-center justify-center", className)} {...(props || {})}>
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
