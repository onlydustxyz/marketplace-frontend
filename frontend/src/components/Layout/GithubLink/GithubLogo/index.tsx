import githubLogo from "assets/img/github-logo.svg";
import { useIntl } from "src/hooks/useIntl";

export default function GithubLogo() {
  const { T } = useIntl();
  return <img className="md:w-16 w-8 hover:opacity-90" src={githubLogo} alt={T("images.githubLogo")} />;
}
