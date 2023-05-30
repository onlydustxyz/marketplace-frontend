import classNames from "classnames";

export enum Size {
  Default = "Default",
  Large = "Large",
}

interface Props {
  size?: Size;
}

export default function GithubLogo({ size = Size.Default }: Props) {
  return <i role="githubLogo" className={classNames("ri-github-fill", { ["text-3xl"]: size === Size.Large })} />;
}
