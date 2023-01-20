import { PropsWithChildren } from "react";
import headerElementBackground from "src/assets/img/payout-information-missing-banner-background.svg";
import Card from "src/components/Card";
import RiErrorWarningLine from "src/icons/RiErrorWarningLine";
import { useT } from "talkr";

export default function InfoMissingBanner({ children }: PropsWithChildren) {
  const { T } = useT();
  return (
    <Card
      backgroundImageUrl={headerElementBackground}
      className="bg-opacity-0 backdrop-blur-0 border-none py-5"
      backgroundImageClassName="bg-no-repeat bg-cover rounded-2xl"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start items-center font-medium gap-4">
          <RiErrorWarningLine className="px-3 py-2.5 text-3xl rounded-2xl bg-white/10" />
          <div className="flex flex-col ">
            <div className="text-lg font-medium">{T("profile.missing.title")}</div>
            <div className="text-sm font-normal">{T("profile.missing.subtitle")}</div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
}
