"use client";

import Image from "next/image";
import logo from "public/images/logo-full.svg";
import background from "public/images/signup-template/signup-aside-background.jpg";

import { Link } from "components/atoms/link";

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
        {/*// TODO: Replace with actual links*/}
        <Link href={"#"}>Support</Link>
        <Link href={"#"}>FAQ</Link>
        <Link href={"#"}>Privacy Policy</Link>
      </div>
    </div>
  );
}
