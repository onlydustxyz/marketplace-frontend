import { linkClickHandlerFactory } from "src/utils/clickHandler";
import githubLogo from "assets/img/github-logo.svg";

interface LinkProps {
  link: string;
}

export default function GithubLink({ link }: LinkProps) {
  return (
    <div
      className="flex justify-center border rounded-xl grayscale border-neutral-100 opacity-80 hover:opacity-50 hover:cursor-pointer md:w-10 w-6 md:h-10 h-6"
      onClick={linkClickHandlerFactory(link)}
    >
      <img className="fill-neutral-100 w-5" alt="GitHub Logo" src={githubLogo} />
    </div>
  );
}
