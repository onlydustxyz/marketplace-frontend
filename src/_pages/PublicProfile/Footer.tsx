import { useMediaQuery } from "usehooks-ts";

import { IMAGES } from "src/assets/img";
import { viewportConfig } from "src/config";
import { useSidePanel } from "src/hooks/useSidePanel";

import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

export default function Footer() {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

  return (
    <div className="flex w-full justify-between px-4 py-6 lg:px-0">
      <a
        className="flex cursor-pointer items-center gap-3"
        href="https://onlydust.xyz"
        target="_blank"
        rel="noreferrer"
      >
        <img className="h-10 w-10" src={IMAGES.logo.original} alt={T("images.onlyDustLogo")} />
        <img className="mt-1 hidden h-6 md:inline" src={IMAGES.svg.onlydust.title} alt={T("images.onlyDustTitle")} />
      </a>
      <div className="flex items-center gap-3 text-spaceBlue-50">
        <div className="flex flex-row gap-1 font-walsheim text-sm font-normal">
          <div className="text-spaceBlue-200">{T("publicProfile.copyright", { year: new Date().getFullYear() })}</div>
          <div className="text-spaceBlue-200">{T("publicProfile.separator")}</div>
          <div className="cursor-pointer" onClick={() => openFullTermsAndConditions()}>
            {T(isXl ? "publicProfile.termsAndConditions" : "publicProfile.terms")}
          </div>
          <div className="text-spaceBlue-200">{T("publicProfile.separator")}</div>
          <div className="cursor-pointer" onClick={() => openPrivacyPolicy()}>
            {T(isXl ? "publicProfile.privacyPolicy" : "publicProfile.privacy")}
          </div>
        </div>
        <a href="https://twitter.com/OnlyDust_xyz" target="_blank" rel="noreferrer" className="hidden md:inline">
          <Icon remixName="ri-twitter-x-fill" size={20} />
        </a>
        <a href="https://github.com/onlydustxyz" target="_blank" rel="noreferrer" className="hidden md:inline">
          <Icon remixName="ri-github-fill" size={20} />
        </a>
      </div>
    </div>
  );
}
