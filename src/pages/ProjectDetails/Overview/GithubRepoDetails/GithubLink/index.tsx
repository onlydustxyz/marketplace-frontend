import githubLogo from "assets/img/github-logo.svg";

interface LinkProps {
  link: string;
}

export default function GithubLink({ link }: LinkProps) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex h-8 w-8 justify-center rounded-xl border border-neutral-100 bg-white/5 grayscale hover:cursor-pointer hover:opacity-60"
      rel="noreferrer"
    >
      <img className="w-3.5 fill-neutral-100" alt="GitHub Logo" src={githubLogo} />
    </a>
  );
}
