import classNames from "classnames";

export enum Size {
  Large = "Large",
}

interface Props {
  size?: Size;
}

export default function GithubLogo({ size = Size.Large }: Props) {
  return <i role="githubLogo" className={classNames("ri-github-fill", { ["text-3xl"]: size === Size.Large })} />;
}
