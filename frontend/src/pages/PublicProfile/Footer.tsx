import onlyDustLogo from "assets/img/onlydust-logo.png";
import onlyDustTitle from "assets/img/onlydust-title.svg";
import { useIntl } from "src/hooks/useIntl";
import GithubLogo from "src/icons/GithubLogo";
import TwitterFill from "src/icons/TwitterFill";
import { useSidePanel } from "src/hooks/useSidePanel";

export default function Footer() {
  const { T } = useIntl();
  const { openFullTermsAndConditions } = useSidePanel();

  return (
    <div className="px-4 lg:px-0 flex w-full py-6 justify-between">
      <div className="flex items-center gap-3">
        <img className="h-10 w-10" src={onlyDustLogo} alt={T("images.onlyDustLogo")} />
        <img className="h-6 mt-1 hidden md:inline" src={onlyDustTitle} alt={T("images.onlyDustTitle")} />
      </div>
      <div className="flex items-center gap-3 text-spaceBlue-50">
        <div className="flex flex-row gap-1 font-walsheim text-sm font-normal">
          <div className="text-spaceBlue-200">{T("publicProfile.copyright")}</div>
          <div className="text-spaceBlue-200">{T("publicProfile.separator")}</div>
          <div className="cursor-pointer" onClick={() => openFullTermsAndConditions()}>
            {T("publicProfile.termsAndConditions")}
          </div>
        </div>
        <a href="https://twitter.com/OnlyDust_xyz" className="hidden md:inline">
          <TwitterFill className="text-xl" />
        </a>
        <a href="https://github.com/onlydustxyz" className="hidden md:inline">
          <GithubLogo className="text-xl" />
        </a>
      </div>
    </div>
  );
}
