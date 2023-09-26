import { ComponentProps, PropsWithChildren, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import ContributionTable from "src/components/ContributionTable/ContributionTable";
import { Tabs } from "src/components/Tabs/Tabs";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { isInArray } from "src/utils/isInArray";
import { ContributionsOrderBy, OrderBy, useGetAllContributionsQuery } from "src/__generated/graphql";
// import IssueDraft from "src/assets/icons/IssueDraft";
import IssueMerged from "src/assets/icons/IssueMerged";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import StackLine from "src/assets/icons/StackLine";
import SEO from "src/components/SEO";

export enum ContributionTableStatus {
  InProgress = "in_progress",
  Completed = "complete",
  Canceled = "canceled",
}

enum AllTabs {
  All = "allContributions",
  //   Applied = "applied",
  InProgress = "inProgress",
  Completed = "completed",
  Canceled = "canceled",
}

const tabValues = Object.values(AllTabs);

function TabContents({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2 md:gap-1.5">{children}</div>;
}

export default function Contributions() {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;

  const [activeTab, setActiveTab] = useState(isInArray(tabValues, tab ?? "") ? tab : AllTabs.All);

  const {
    data: inProgressData,
    loading: inProgressLoading,
    error: inProgressError,
  } = useGetAllContributionsQuery({
    variables: {
      limit: 20,
      orderBy: { createdAt: OrderBy.Desc } as ContributionsOrderBy,
      githubUserId,
      status: ContributionTableStatus.InProgress,
    },
    skip: !githubUserId || (!isActiveTab(AllTabs.All) && !isActiveTab(AllTabs.InProgress)),
    fetchPolicy: "network-only",
  });

  const {
    data: completedData,
    loading: completedLoading,
    error: completedError,
  } = useGetAllContributionsQuery({
    variables: {
      limit: 20,
      orderBy: { createdAt: OrderBy.Desc } as ContributionsOrderBy,
      githubUserId,
      status: ContributionTableStatus.Completed,
    },
    skip: !githubUserId || (!isActiveTab(AllTabs.All) && !isActiveTab(AllTabs.Completed)),
    fetchPolicy: "network-only",
  });

  const {
    data: canceledData,
    loading: canceledLoading,
    error: canceledError,
  } = useGetAllContributionsQuery({
    variables: {
      limit: 20,
      orderBy: { createdAt: OrderBy.Desc } as ContributionsOrderBy,
      githubUserId,
      status: ContributionTableStatus.Canceled,
    },
    skip: !githubUserId || (!isActiveTab(AllTabs.All) && !isActiveTab(AllTabs.Canceled)),
    fetchPolicy: "network-only",
  });

  function isActiveTab(tab: AllTabs) {
    return activeTab === tab;
  }

  function updateActiveTab(tab: AllTabs) {
    setActiveTab(tab);
    setSearchParams({ tab });
  }

  const tabItems = [
    {
      active: isActiveTab(AllTabs.All),
      onClick: () => {
        updateActiveTab(AllTabs.All);
      },
      testId: "contributions-all-contributions-tab",
      children: (
        <TabContents>
          <StackLine className="h-5 w-5 md:hidden" />
          {T("contributions.nav.allContributions")}
        </TabContents>
      ),
    },
    // {
    //   active: isActiveTab(AllTabs.Applied),
    //   onClick: () => {
    //     updateActiveTab(AllTabs.Applied);
    //   },
    //   testId: "contributions-applied-tab",
    //   children: (
    //     <TabContents>
    //       <IssueDraft className="h-5 w-5 md:h-4 md:w-4" />
    //       {T("contributions.nav.applied")}
    //     </TabContents>
    //   ),
    // },
    {
      active: isActiveTab(AllTabs.InProgress),
      onClick: () => {
        updateActiveTab(AllTabs.InProgress);
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
      active: isActiveTab(AllTabs.Completed),
      onClick: () => {
        updateActiveTab(AllTabs.Completed);
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
      active: isActiveTab(AllTabs.Canceled),
      onClick: () => {
        updateActiveTab(AllTabs.Canceled);
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

  const tableItems: Array<ComponentProps<typeof ContributionTable> & { show: boolean }> = [
    // {
    //   id: "applied_contributions_table",
    //   title: T("contributions.applied.title"),
    //   description: T("contributions.applied.description"),
    //   icon: className => <IssueDraft className={className} />,
    //   onHeaderClick: () => {
    //     updateActiveTab(AllTabs.Applied);
    //   },
    // },
    {
      id: "in_progress_contributions_table",
      title: T("contributions.inProgress.title"),
      description: T("contributions.inProgress.description"),
      icon: className => <ProgressCircle className={className} />,
      onHeaderClick: () => {
        updateActiveTab(AllTabs.InProgress);
      },
      data: inProgressData,
      loading: inProgressLoading,
      error: inProgressError,
      status: ContributionTableStatus.InProgress,
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.InProgress),
    },
    {
      id: "completed_contributions_table",
      title: T("contributions.completed.title"),
      description: T("contributions.completed.description"),
      icon: className => <IssueMerged className={className} />,
      onHeaderClick: () => {
        updateActiveTab(AllTabs.Completed);
      },
      data: completedData,
      loading: completedLoading,
      error: completedError,
      status: ContributionTableStatus.Completed,
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Completed),
    },
    {
      id: "canceled_contributions_table",
      title: T("contributions.canceled.title"),
      description: T("contributions.canceled.description"),
      icon: className => <CancelCircleLine className={className} />,
      onHeaderClick: () => {
        updateActiveTab(AllTabs.Canceled);
      },
      data: canceledData,
      loading: canceledLoading,
      error: canceledError,
      status: ContributionTableStatus.Canceled,
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Canceled),
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
              {tableItems.map(({ show, ...restProps }) =>
                show ? (
                  <ContributionTable key={restProps.id} {...restProps} showHeader={isActiveTab(AllTabs.All)} />
                ) : null
              )}
            </div>
          </div>
        </Background>
      </div>
    </>
  );
}
