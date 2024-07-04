import Image from "next/image";
import PageBannerBackgroundDesktop from "public/images/banners/page-banner/page-banner-background-desktop.png";
import PageBannerBackgroundMobile from "public/images/banners/page-banner/page-banner-background-mobile.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

import { PageBannerProps } from "./page-banner.types";

export function PageBanner({ message, cta, onClose }: PageBannerProps) {
  function renderCTA() {
    if (!cta) return null;

    const startIcon = cta.icon
      ? {
          remixName: cta.icon,
        }
      : undefined;

    if (cta.href) {
      return (
        <div>
          <Button
            as={"a"}
            htmlProps={{
              href: cta.href,
              target: cta.isExternal ? "_blank" : undefined,
              rel: cta.isExternal ? "noopener noreferrer" : undefined,
            }}
            startIcon={startIcon}
          >
            {cta.text}
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Button onClick={cta.onClick} startIcon={startIcon}>
          {cta.text}
        </Button>
      </div>
    );
  }

  function renderCloseButton() {
    if (typeof onClose !== "function") return null;

    return (
      <button className={"absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex"} onClick={onClose}>
        <Icon remixName={"ri-close-line"} size={24} />
      </button>
    );
  }

  return (
    <section className={"relative flex justify-center px-4 py-3 md:pr-14"}>
      <Image
        src={PageBannerBackgroundDesktop}
        alt={""}
        className={"absolute hidden object-cover object-center md:block"}
        fill
      />
      <Image
        src={PageBannerBackgroundMobile}
        alt={""}
        className={"absolute object-cover object-center md:hidden"}
        fill
      />
      <div className={"relative z-10 flex items-center gap-4"}>
        <Typo size={"m"} weight={"medium"} color={"text-1"}>
          {message}
        </Typo>

        {renderCTA()}
      </div>

      {renderCloseButton()}
    </section>
  );
}
