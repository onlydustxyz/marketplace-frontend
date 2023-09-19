import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";

import { Tabs } from "src/components/Tabs/Tabs";

export default function Contributions() {
  const tabs = [
    {
      active: true,
      onClick: () => {},
      testId: "contributions-all-contributions-tab",
      children: "All contributions",
    },
    {
      active: false,
      onClick: () => {},
      testId: "contributions-applied-tab",
      children: "Applied",
    },
    {
      active: false,
      onClick: () => {},
      testId: "contributions-in-progress-tab",
      children: "In progress",
    },
    {
      active: false,
      onClick: () => {},
      testId: "contributions-completed-tab",
      children: "Completed",
    },
    {
      active: false,
      onClick: () => {},
      testId: "contributions-canceled-tab",
      children: "Canceled",
    },
  ];

  return (
    <>
      <SEO />
      <div className="h-full bg-black px-6 pb-6">
        <Background roundedBorders={BackgroundRoundedBorders.Full}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000113]/[0] to-[#0E0D2E]" />
          <div className="relative z-10">
            <header className="bg-white/8 px-8 pt-8 shadow-2xl backdrop-blur-3xl">
              <Tabs tabs={tabs} />
            </header>
            Contributions
          </div>
        </Background>
      </div>
    </>
  );
}
