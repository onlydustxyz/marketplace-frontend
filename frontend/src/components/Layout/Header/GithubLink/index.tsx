import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import GithubLogo from "src/icons/GithubLogo";

const loginUrl = `${config.LOGIN_URL}?redirect_url=${encodeURI(window.location.origin)}`;

type Props = {
  onClick?: () => void;
};

export default function GithubLink({ onClick }: Props) {
  const { T } = useIntl();
  return (
    <a className="z-10" href={loginUrl} onClick={onClick}>
      <div className="overflow-hidden w-fit transition duration-300 rounded-full m-px p-px hover:m-0 hover:p-0.5">
        <div className="relative w-fit flex justify-center items-center bg-black hover:bg-spacePurple-900 rounded-full before:absolute before:-z-10 before:h-screen before:w-screen before:bg-multi-color-gradient hover:before:animate-spin-invert-slow">
          <div className="flex flex-row items-center gap-2 w-fit py-1 px-2">
            <GithubLogo />
            <div className="flex font-belwe mr-1">{T("navbar.signInWithGithub")}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
