import { linkClickHandlerFactory } from "src/utils/clickHandler";
import githubLogo from "assets/img/github-logo.svg";

interface LinkProps {
  link: string;
}

export default function GithubLink({ link }: LinkProps) {
  return (
    <div className="border-2 rounded-xl p-2 grayscale border-slate-500 opacity-80 hover:opacity-50 hover:cursor-pointer">
      <div onClick={linkClickHandlerFactory(link)}>
        <img className="md:w-10 w-6 fill-white" alt="GitHub Logo" src={githubLogo} />
      </div>
    </div>
  );
}
