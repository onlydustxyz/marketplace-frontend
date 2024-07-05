import Image from "next/image";
import PageBannerBackgroundDesktop from "public/images/banners/page-banner/page-banner-background-desktop.png";
import PageBannerBackgroundMobile from "public/images/banners/page-banner/page-banner-background-mobile.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

import { PageBannerProps } from "./page-banner.types";

function Cta({ cta }: { cta: PageBannerProps["cta"] }) {
  if (!cta) return null;

  const startIcon = cta.icon
    ? {
        remixName: cta.icon,
      }
    : undefined;

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

function CloseButton({ onClick }: { onClick: PageBannerProps["onClose"] }) {
  if (typeof onClick !== "function") return null;

  return (
    <button className={"absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex"} onClick={onClick}>
      <Icon remixName={"ri-close-line"} size={24} />
    </button>
  );
}

export function PageBanner({ message, cta, onClose }: PageBannerProps) {
  return (
    <div className={"relative mx-auto flex w-full max-w-[1920px] justify-center px-4 py-3 md:pr-14"}>
      <Image
        src={PageBannerBackgroundDesktop}
        alt={message}
        className={"pointer-events-none absolute hidden object-cover object-center md:flex"}
        fill
        priority
      />
      <Image
        src={PageBannerBackgroundMobile}
        alt={message}
        className={"pointer-events-none absolute object-cover object-center md:hidden"}
        fill
        priority
      />
      <div className={"relative z-10 flex items-center gap-4"}>
        <Typo size={"m"} weight={"medium"} color={"text-1"}>
          {message}
        </Typo>

        <Cta cta={cta} />
      </div>

      <CloseButton onClick={onClose} />
    </div>
  );
}
