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

export type TagProps = {
  size: TagSize;
  label: string;
  icon?: TagIcon;
  iconColor?: TagIconColor;
  borderColor?: TagBorderColor;
};

export default function Tag({
  size,
  label,
  icon,
  iconColor = TagIconColor.Grey,
  borderColor = TagBorderColor.Grey,
}: TagProps) {
  return (
    <div className="w-fit rounded-full p-px overflow-hidden">
      <div
        className={classNames(
          "flex items-center justify-center w-fit gap-1 bg-spaceBlue-900 rounded-full font-walsheim font-medium text-white relative",
          "before:absolute before:h-screen before:w-screen before:-z-10",
          {
            "py-1 px-2 text-xs": size === TagSize.Small,
            "py-1.5 px-3 text-sm": size === TagSize.Medium,
            "py-2 px-4 text-sm": size === TagSize.Large,
          },
          {
            "before:bg-greyscale-50/8": borderColor === TagBorderColor.Grey,
            "before:bg-multi-color-gradient before:animate-spin-invert-slow": borderColor === TagBorderColor.MultiColor,
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
        <span className="text-center">{label}</span>
      </div>
    </div>
  );
}
