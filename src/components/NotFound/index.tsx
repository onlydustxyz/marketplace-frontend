"use client";

import { IMAGES } from "src/assets/img";
import Button, { ButtonSize } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";

import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export function NotFound() {
  const { T } = useIntl();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12 bg-[url('/images/not-found.webp')] bg-cover bg-center p-5">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <img src={IMAGES.svg.onlydust.logoWhite} alt="OnlyDust" className="w-12" />
        <div className="font-belwe text-2xl sm:text-3xl">
          <div>{T("notFound.title1")}</div>
          <div>{T("notFound.title2")}</div>
        </div>
        <div className="font-walsheim text-base text-spaceBlue-200 sm:text-lg">{T("notFound.text")}</div>
      </div>
      <BaseLink href={NEXT_ROUTER.home.all}>
        <Button size={ButtonSize.Lg}>
          <ArrowLeftSLine className="text-xl" /> {T("notFound.button")}
        </Button>
      </BaseLink>
    </div>
  );
}
