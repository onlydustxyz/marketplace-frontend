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
  id?: string;
  icon?: BadgeIcon;
  size: BadgeSize;
  value: number;
};

export default function Badge({ id, icon, size, value, ...rest }: Props) {
  return (
    <div
      id={id}
      className={classNames(
        "flex min-w-min items-center justify-center rounded-full bg-spacePurple-900 font-walsheim font-medium text-spacePurple-500",
        {
          "h-5 w-5 gap-0.5 px-1.5": size === BadgeSize.Small,
          "h-6 w-6 gap-1 px-2": size === BadgeSize.Medium,
          "h-8 w-8 gap-1 px-3": size === BadgeSize.Large,
        }
      )}
      {...rest}
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
