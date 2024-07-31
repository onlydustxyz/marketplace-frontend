"use client";

import { bootstrap } from "core/bootstrap";
import Image from "next/image";
import logo from "public/images/logo-full.svg";
import background from "public/images/signup-template/signup-aside-background.jpg";

import { Link } from "components/atoms/link";
import { Translate } from "components/layout/translate/translate";

export function SignupAside() {
  return (
    <div
      className={
        "relative z-[1] flex h-full w-full flex-col items-start justify-between overflow-hidden rounded-xl p-6"
      }
    >
      <Image
        src={background}
        alt="card background"
        className="absolute inset-0 -z-[1] h-full w-full rounded-xl object-cover object-center outline-1 outline-container-stroke-separator"
      />
      <div className="absolute inset-0 -z-[1] h-full w-full rounded-xl border-1 border-container-stroke-separator" />
      <Image src={logo} alt="Onlydust" className="h-auto w-[163px]" />
      <div className="flex flex-col justify-start gap-2">
        <Link href="https://blog.onlydust.com/changelog/" isExternalIconVisible>
          <Translate token="v2.pages.signup.onboarding.tunnel.aside.changeLog" />
        </Link>
        <Link href="https://blog.onlydust.com/docs/" isExternalIconVisible>
          <Translate token="v2.pages.signup.onboarding.tunnel.aside.faq" />
        </Link>
        <Link href={bootstrap.legalHelperPort.getPrivacyPolicyUrl()} isExternalIconVisible>
          <Translate token="v2.pages.signup.onboarding.tunnel.aside.privacyPolicy" />
        </Link>
      </div>
    </div>
  );
}
