import classNames from "classnames";

export enum BadgeIcon {
  GitMerge = "git-merge-line",
}

export enum BadgeSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type Props = {
  icon?: BadgeIcon;
  size: BadgeSize;
  value: number;
};

export default function Badge({ icon, size, value }: Props) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center rounded-full bg-spacePurple-900 text-spacePurple-500 font-walsheim min-w-min font-medium",
        {
          "w-5 h-5 px-1 gap-0.5": size === BadgeSize.Small,
          "w-6 h-6 px-1 gap-1": size === BadgeSize.Medium,
          "w-8 h-8 px-3 gap-1": size === BadgeSize.Large,
        }
      )}
    >
      {icon && (
        <i
          className={classNames(`ri-${icon}`, {
            "text-xs": size === BadgeSize.Small,
            "text-base": [BadgeSize.Medium, BadgeSize.Large].includes(size),
          })}
        ></i>
      )}
      <span
        className={classNames({
          "text-sm": size === BadgeSize.Small,
          "text-base": size === BadgeSize.Medium,
          "text-lg": size === BadgeSize.Large,
        })}
      >
        {value}
      </span>
    </div>
  );
}
