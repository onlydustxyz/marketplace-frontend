import { linkClickHandlerFactory } from "src/utils/clickHandler";
import githubLogo from "assets/img/github-logo.svg";

interface LinkProps {
  link: string;
}

export default function GithubLink({ link }: LinkProps) {
  return (
    <div
      className="flex justify-center border rounded-xl grayscale border-neutral-100 bg-white/5 hover:opacity-60 hover:cursor-pointer w-8 h-8"
      onClick={linkClickHandlerFactory(link)}
    >
      <img className="fill-neutral-100 w-3.5" alt="GitHub Logo" src={githubLogo} />
    </div>
  );
}
