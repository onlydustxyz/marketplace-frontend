import GithubLogo from "./GithubLogo";
import config from "src/config";
import { useIntl } from "src/hooks/useIntl";

const GITHUB_SIGN_IN_URL = `${config.HASURA_AUTH_BASE_URL}/signin/provider/github`;

export default function GithubLink() {
  const { T } = useIntl();
  return (
    <a href={GITHUB_SIGN_IN_URL}>
      <div className="flex flex-row items-center gap-2.5 w-fit py-2 px-4 border-slate-400 border border-solid border-white rounded-3xl">
        <div className="text-base md:flex hidden text-white font-bold">{T("navbar.signInWithGithub")}</div>
        <GithubLogo />
      </div>
    </a>
  );
}
