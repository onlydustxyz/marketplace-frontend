import { PropsWithChildren, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { isIn } from "src/utils/isIn";
import { Tabs } from "src/components/Tabs/Tabs";
import { useAuth } from "src/hooks/useAuth";
import { useGetAllContributionsQuery, OrderBy, ContributionsOrderBy } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import ContributionTable from "src/components/ContributionTable/ContributionTable";
import IssueDraft from "src/assets/icons/IssueDraft";
import IssueMerged from "src/assets/icons/IssueMerged";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import SEO from "src/components/SEO";
import StackLine from "src/assets/icons/StackLine";

const tabs = {
  all: "allContributions",
  applied: "applied",
  inProgress: "inProgress",
  completed: "completed",
  canceled: "canceled",
} as const;

const tabValues = Object.values(tabs);

function TabContents({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2 md:gap-1.5">{children}</div>;
}

export default function Contributions() {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;

  const [activeTab, setActiveTab] = useState(isIn(tabValues, tab ?? "") ? tab : tabs.all);

  const { data, loading, error } = useGetAllContributionsQuery({
    variables: {
      limit: 20,
      orderBy: { createdAt: OrderBy.Desc } as ContributionsOrderBy,
      githubUserId,
    },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  console.log({ data, loading, error });

  function updateActiveTab(tab: typeof tabValues[number]) {
    setActiveTab(tab);
    setSearchParams({ tab });
  }

  const tabItems = [
    {
      active: activeTab === tabs.all,
      onClick: () => {
        updateActiveTab(tabs.all);
      },
      testId: "contributions-all-contributions-tab",
      children: (
        <TabContents>
          <StackLine className="h-5 w-5 md:hidden" />
          {T("contributions.nav.allContributions")}
        </TabContents>
      ),
    },
    {
      active: activeTab === tabs.applied,
      onClick: () => {
        updateActiveTab(tabs.applied);
      },
      testId: "contributions-applied-tab",
      children: (
        <TabContents>
          <IssueDraft className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.applied")}
        </TabContents>
      ),
    },
    {
      active: activeTab === tabs.inProgress,
      onClick: () => {
        updateActiveTab(tabs.inProgress);
      },
      testId: "contributions-in-progress-tab",
      children: (
        <TabContents>
          <ProgressCircle className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.inProgress")}
        </TabContents>
      ),
    },
    {
      active: activeTab === tabs.completed,
      onClick: () => {
        updateActiveTab(tabs.completed);
      },
      testId: "contributions-completed-tab",
      children: (
        <TabContents>
          <IssueMerged className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.completed")}
        </TabContents>
      ),
    },
    {
      active: activeTab === tabs.canceled,
      onClick: () => {
        updateActiveTab(tabs.canceled);
      },
      testId: "contributions-canceled-tab",
      children: (
        <TabContents>
          <CancelCircleLine className="h-5 w-5 md:h-4 md:w-4" />
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
            <header className="border-b border-greyscale-50/20 bg-white/8 px-4 pb-4 pt-7 shadow-2xl backdrop-blur-3xl md:px-8 md:pb-0 md:pt-8">
              <Tabs tabs={tabItems} variant="blue" mobileTitle={T("navbar.contributions")} />
            </header>
            <div className="flex flex-col gap-4 p-8">
              <ContributionTable
                id="applied_contributions_table"
                title={T("contributions.applied.title")}
                description={T("contributions.applied.description")}
                icon={className => <IssueDraft className={className} />}
                onHeaderClick={() => {
                  updateActiveTab(tabs.applied);
                }}
              />
            </div>
          </div>
        </Background>
      </div>
    </>
  );
}
