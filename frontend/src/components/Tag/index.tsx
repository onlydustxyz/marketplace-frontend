import classNames from "classnames";

export enum TagSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum TagIcon {
  Check = "check",
  Time = "time",
  Warning = "error-warning",
}

export enum TagIconColor {
  Grey = "grey",
  Orange = "orange",
  Pink = "pink",
}

export enum TagBorderColor {
  Grey = "grey",
  MultiColor = "multi-color",
}

export enum TagBackgroundColor {
  SpaceBlueOpaque = "space-blue-opaque",
  WhiteTransparent = "white-transparent",
}

export type TagProps = {
  size: TagSize;
  label: string;
  icon?: TagIcon;
  iconColor?: TagIconColor;
  borderColor?: TagBorderColor;
  backgroundColor?: TagBackgroundColor;
  whitespaceNoWrap?: boolean;
};

export default function Tag({
  size,
  label,
  icon,
  iconColor = TagIconColor.Grey,
  borderColor = TagBorderColor.Grey,
  backgroundColor = TagBackgroundColor.WhiteTransparent,
  whitespaceNoWrap = false,
}: TagProps) {
  return (
    <div className="w-fit rounded-full p-px overflow-hidden">
      <div
        className={classNames(
          "flex items-center justify-center w-fit gap-1 rounded-full font-walsheim font-medium text-white relative",
          "before:absolute before:h-screen before:w-screen before:-z-10",
          {
            "py-1 px-2 text-xs": size === TagSize.Small,
            "py-1.5 px-3 text-sm": size === TagSize.Medium,
            "py-2 px-4 text-sm": size === TagSize.Large,
          },
          {
            "border border-greyscale-50/8": borderColor === TagBorderColor.Grey,
            "before:bg-multi-color-gradient before:animate-spin-invert-slow": borderColor === TagBorderColor.MultiColor,
          },
          {
            "bg-spaceBlue-900": backgroundColor === TagBackgroundColor.SpaceBlueOpaque,
            "bg-white/2": backgroundColor === TagBackgroundColor.WhiteTransparent,
          }
        )}
      >
        {icon && (
          <i
            className={classNames(
              `ri-${icon}-line`,
              {
                "text-xs": size === TagSize.Small,
                "text-sm": size === TagSize.Medium,
                "text-base": size === TagSize.Large,
              },
              {
                "text-greyscale-50": iconColor === TagIconColor.Grey,
                "text-orange-500": iconColor === TagIconColor.Orange,
                "text-pink-500": iconColor === TagIconColor.Pink,
              }
            )}
          />
        )}
        <span className={classNames("text-center", { "whitespace-nowrap": whitespaceNoWrap })}>{label}</span>
      </div>
    </div>
  );
}
