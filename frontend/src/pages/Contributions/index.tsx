import { useState } from "react";

import { Tabs } from "src/components/Tabs/Tabs";
import { useIntl } from "src/hooks/useIntl";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import IssueDraft from "src/assets/icons/IssueDraft";
import IssueMerged from "src/assets/icons/IssueMerged";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import SEO from "src/components/SEO";

const TAB_ALL = "allContributions";
const TAB_APPLIED = "applied";
const TAB_IN_PROGRESS = "inProgress";
const TAB_COMPLETED = "completed";
const TAB_CANCELED = "canceled";

function TabContents({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1.5">{children}</div>;
}

export default function Contributions() {
  const { T } = useIntl();

  const [activeTab, setActiveTab] = useState(TAB_ALL);

  const tabs = [
    {
      active: activeTab === TAB_ALL,
      onClick: () => {
        setActiveTab(TAB_ALL);
      },
      testId: "contributions-all-contributions-tab",
      children: T("contributions.nav.allContributions"),
    },
    {
      active: activeTab === TAB_APPLIED,
      onClick: () => {
        setActiveTab(TAB_APPLIED);
      },
      testId: "contributions-applied-tab",
      children: (
        <TabContents>
          <IssueDraft />
          {T("contributions.nav.applied")}
        </TabContents>
      ),
    },
    {
      active: activeTab === TAB_IN_PROGRESS,
      onClick: () => {
        setActiveTab(TAB_IN_PROGRESS);
      },
      testId: "contributions-in-progress-tab",
      children: (
        <TabContents>
          <ProgressCircle />
          {T("contributions.nav.inProgress")}
        </TabContents>
      ),
    },
    {
      active: activeTab === TAB_COMPLETED,
      onClick: () => {
        setActiveTab(TAB_COMPLETED);
      },
      testId: "contributions-completed-tab",
      children: (
        <TabContents>
          <IssueMerged />
          {T("contributions.nav.completed")}
        </TabContents>
      ),
    },
    {
      active: activeTab === TAB_CANCELED,
      onClick: () => {
        setActiveTab(TAB_CANCELED);
      },
      testId: "contributions-canceled-tab",
      children: (
        <TabContents>
          <CancelCircleLine />
          {T("contributions.nav.canceled")}
        </TabContents>
      ),
    },
  ];

  return (
    <>
      <SEO />
      <div className="h-full bg-black px-6 pb-6">
        <Background roundedBorders={BackgroundRoundedBorders.Full}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000113]/[0] to-[#0E0D2E]" />
          <div className="relative z-10">
            <header className="border-b border-greyscale-50/20 bg-white/8 px-8 pt-8 shadow-2xl backdrop-blur-3xl">
              <Tabs tabs={tabs} variant="blue" />
            </header>
            Contributions
          </div>
        </Background>
      </div>
    </>
  );
}
