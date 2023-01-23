import { PropsWithChildren } from "react";
import headerElementBackground from "src/assets/img/alert-bg.png";
import ImageCard, { BackgroundSize } from "src/components/ImageCard";
import RiErrorWarningLine from "src/icons/RiErrorWarningLine";
import { useT } from "talkr";

export default function InfoMissingBanner({ children }: PropsWithChildren) {
  const { T } = useT();
  return (
    <ImageCard backgroundImageUrl={headerElementBackground} backgroundSize={BackgroundSize.Cover}>
      <div className="flex flex-row justify-between py-5 px-6">
        <div className="flex flex-row justify-start items-center font-medium gap-4">
          <RiErrorWarningLine className="px-3 py-2.5 text-3xl rounded-2xl bg-white/10" />
          <div className="flex flex-col ">
            <div className="text-lg font-medium">{T("profile.missing.title")}</div>
            <div className="text-sm font-normal">{T("profile.missing.subtitle")}</div>
          </div>
        </div>
        {children}
      </div>
    </ImageCard>
  );
}
