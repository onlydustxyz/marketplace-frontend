import githubLogo from "assets/img/github-logo.svg";
import { useIntl } from "src/hooks/useIntl";

export default function GithubLogo() {
  const { T } = useIntl();
  return <img className="w-7 hover:opacity-90" src={githubLogo} alt={T("images.githubLogo")} />;
}
