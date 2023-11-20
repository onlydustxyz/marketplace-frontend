import { useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";
import { useLoginUrl } from "src/hooks/useLoginUrl/useLoginUrl";
import GithubLogo, { Size } from "src/icons/GithubLogo";

type Props = {
  onClick?: () => void;
};

export default function GithubLink({ onClick }: Props) {
  const { T } = useIntl();
  const getLoginUrl = useLoginUrl();
  const login_url = useMemo(() => getLoginUrl(), []);
  return (
    <a className="z-10" href={login_url} onClick={onClick} data-testid="github-signin-button">
      <div className="m-px w-fit overflow-hidden rounded-full p-px blur-0 transition duration-300 hover:m-0 hover:p-0.5">
        <div className="relative flex w-fit items-center justify-center rounded-full bg-black before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:bg-multi-color-gradient hover:bg-spacePurple-900 hover:before:animate-spin-invert-slow">
          <div className="flex w-fit flex-row items-center gap-2 px-2 py-0.5">
            <GithubLogo size={Size.Large} />
            <div className="mr-1 flex font-belwe">{T("navbar.signInWithGithub")}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
