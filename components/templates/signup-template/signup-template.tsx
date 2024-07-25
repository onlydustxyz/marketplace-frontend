import Image from "next/image";
import logo from "public/images/logo-full.svg";

import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { SignupAside } from "components/templates/signup-aside/signup-aside";

import { TSignupTemplate } from "./signup-template.types";

export function SignupTemplate({ children, header, aside, footer }: TSignupTemplate.Props) {
  return (
    <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden bg-black p-1 md:bg-transparent md:p-2">
      <Paper
        classNames={{
          base: cn(
            "flex h-full max-h-[800px] overflow-hidden w-[1000px] max-w-full flex-col gap-2 md:bg-container-1",
            "p-0 bg-transparent border-0",
            "md:p-2 md:border-1 md:bg-container-1"
          ),
        }}
        container="1"
      >
        <div className="flex w-full flex-row justify-center py-4 md:hidden">
          <Image src={logo} alt="Onlydust" className="h-auto w-[163px]" />
        </div>
        {header && <div className="hidden h-auto w-full md:block">{header}</div>}
        <div className="flew-row flex w-full flex-1 gap-3 overflow-hidden">
          <div className="hidden h-full w-[250px] md:block lg:w-[350px]">{aside || <SignupAside />}</div>
          <div className="h-full flex-1">
            <div className="scrollbar-sm h-full overflow-y-auto overflow-x-hidden">{children}</div>
          </div>
        </div>
        {footer && <div className="h-auto w-full">{footer}</div>}
      </Paper>
    </div>
  );
}
