import { cn } from "src/utils/cn";

export enum Size {
  Default = "Default",
  Large = "Large",
}

interface Props {
  size?: Size;
  className?: string;
}

export default function GithubLogo({ className, size = Size.Default }: Props) {
  return <i role="githubLogo" className={cn("ri-github-fill", className, { ["text-3xl"]: size === Size.Large })} />;
}
