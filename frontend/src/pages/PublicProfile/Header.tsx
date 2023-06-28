import onlyDustLogoWhite from "assets/img/onlydust-logo-white.svg";
import onlyDustTitle from "assets/img/onlydust-title.svg";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Link from "src/icons/Link";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

type Props = {
  userLogin: string;
};

export default function Header({ userLogin }: Props) {
  const { T } = useIntl();

  return (
    <div className="flex items-center py-6">
      <div className="flex w-full justify-between px-4 py-3 rounded-full bg-white/8 backdrop-blur-3xl drop-shadow-lg">
        <div className="flex items-center gap-3">
          <img className="h-9 w-9" src={onlyDustLogoWhite} alt={T("images.onlyDustLogo")} />
          <img className="h-6 mt-1" src={onlyDustTitle} alt={T("images.onlyDustTitle")} />
        </div>
        <div className="flex gap-3">
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.MdRounded}
            onClick={() =>
              navigator.clipboard.writeText(`${window.location.protocol}://${window.location.host}/u/${userLogin}`)
            }
          >
            <Link className="text-xl" />
            {T("publicProfile.copyUrl")}
          </Button>
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.LgRounded}
            onClick={linkClickHandlerFactory("https://onlydust.xyz")}
          >
            {T("publicProfile.goToOnlydust")}
          </Button>
        </div>
      </div>
    </div>
  );
}
