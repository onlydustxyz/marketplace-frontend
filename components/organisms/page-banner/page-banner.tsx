import Image from "next/image";
import PageBannerBackgroundDesktop from "public/images/banners/page-banner/page-banner-background-desktop.png";
import PageBannerBackgroundMobile from "public/images/banners/page-banner/page-banner-background-mobile.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";

import { PageBannerProps } from "./page-banner.types";

function Cta({ cta }: { cta: PageBannerProps["cta"] }) {
  if (!cta) return null;

  const startIcon = cta.icon
    ? {
        remixName: cta.icon,
      }
    : undefined;

  return (
    <Button
      as={"a"}
      htmlProps={{
        href: cta.href,
        target: cta.isExternal ? "_blank" : undefined,
        rel: cta.isExternal ? "noopener noreferrer" : undefined,
      }}
      startIcon={startIcon}
      classNames={{
        base: "whitespace-nowrap min-w-fit",
      }}
    >
      {cta.text}
    </Button>
  );
}

function CloseButton({ onClick }: { onClick: PageBannerProps["onClose"] }) {
  if (typeof onClick !== "function") return null;

  return (
    <div>
      <Button
        variant="secondary-light"
        onClick={onClick}
        hideText
        startIcon={{
          remixName: "ri-close-line",
        }}
      />
    </div>
  );
}

export function PageBanner({ message, cta, onClose }: PageBannerProps) {
  return (
    <div
      className={"relative mx-auto flex w-full max-w-[1920px] justify-center overflow-hidden px-4 py-3 md:rounded-2xl"}
    >
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

      <div className="flex w-full flex-wrap items-center justify-between gap-1">
        <div className="hidden md:block" />

        <div className={"relative z-10 flex items-center gap-4"}>
          <Typo size={"m"} weight={"medium"} color={"text-1"}>
            {message}
          </Typo>

          <div className="hidden md:block">
            <Cta cta={cta} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-1 md:w-fit">
          <div className="block md:hidden">
            <Cta cta={cta} />
          </div>

          <CloseButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
