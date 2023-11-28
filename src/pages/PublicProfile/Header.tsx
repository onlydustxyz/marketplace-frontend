import onlyDustLogoWhite from "assets/img/onlydust-logo-white.svg";
import onlyDustTitle from "assets/img/onlydust-title.svg";
import { RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import LinkIcon from "src/icons/Link";
import { useNavigate } from "react-router-dom";
import Tooltip from "src/components/Tooltip";

type Props = {
  userLogin: string;
};

export default function Header({ userLogin }: Props) {
  const { T } = useIntl();
  const navigate = useNavigate();

  return (
    <div className="flex items-center md:py-6">
      <div className="flex w-full justify-between bg-white/8 px-4 py-3 md:rounded-full">
        <a
          className="flex cursor-pointer items-center gap-3"
          href="https://onlydust.xyz"
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-9 w-9" src={onlyDustLogoWhite} alt={T("images.onlyDustLogo")} />
          <img className="mt-1 h-6" src={onlyDustTitle} alt={T("images.onlyDustTitle")} />
        </a>
        <div className="flex gap-3">
          <div className="hidden md:block">
            <Button
              id="copy-profile-url-btn"
              type={ButtonType.Secondary}
              size={ButtonSize.MdRounded}
              onClick={() =>
                navigator.clipboard.writeText(`${window.location.protocol}://${window.location.host}/u/${userLogin}`)
              }
            >
              <LinkIcon className="text-xl" />
              {T("publicProfile.copyUrl")}
            </Button>
            <Tooltip anchorSelect="#copy-profile-url-btn" openOnClick={true} delayHide={1000} noArrow={true}>
              {T("publicProfile.urlCopied")}
            </Tooltip>
          </div>
          <Button type={ButtonType.Primary} size={ButtonSize.LgRounded} onClick={() => navigate(RoutePaths.Projects)}>
            {T("publicProfile.goToApp")}
          </Button>
        </div>
      </div>
    </div>
  );
}
