import { FC, PropsWithChildren } from "react";
import headerElementBackground from "src/assets/img/header-element-background.png";
import Card from "src/components/Card";
import RiErrorWarningLine from "src/icons/RiErrorWarningLine";
import { useT } from "talkr";

export default function InfoMissingBanner({ children }: PropsWithChildren) {
  const { T } = useT();
  return (
    <Card
      backgroundImageUrl={headerElementBackground}
      className="bg-opacity-10 border-none backdrop-blur-2xl"
      backgroundImageClassName="bg-no-repeat bg-cover top-500"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start items-center font-medium gap-5">
          <RiErrorWarningLine className="p-3 px-4 text-4xl rounded-2xl bg-white/10" />
          <div className="flex flex-col ">
            <div className="text-xl font-medium">{T("profile.missing.title")}</div>
            <div className="text-lg font-normal">{T("profile.missing.subtitle")}</div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
}
