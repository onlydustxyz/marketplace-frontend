import { ScrollableView } from "app/h/[slug]/clients/scrollable-view/scrollable-view";
import { Navigation } from "app/h/[slug]/components/navigation/navigation";
import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";
import { Intro } from "app/h/[slug]/features/intro/intro";
import { MainDescription } from "app/h/[slug]/features/main-description/main-description";
import { Overview } from "app/h/[slug]/features/overview/overview";
import { mock } from "app/h/[slug]/mock";

import { Header } from "./components/header/header";

export default function HackathonPage({ params }: { params: { slug: string } }) {
  const { slug = "" } = params;
  const data = mock;
  return (
    <ScrollableView>
      <Header endDate={data.endDate} startDate={data.startDate} title={data.title} />
      <Navigation slug={slug} />
      <Wrapper className="max-md:p-2">
        <div className="flex w-full flex-col items-start justify-start gap-6 pb-6 pt-6 md:pt-14" id={"overview"}>
          <Intro title={data.title} subtitle={data.subtitle} />
          <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
            <div className="w-full md:sticky md:left-0 md:top-6 md:w-[400px]">
              <Overview
                startDate={data.startDate}
                endDate={data.endDate}
                totalBudget={data.totalBudget}
                links={data.links}
                sponsors={data.sponsors}
                projects={data.projects}
              />
            </div>
            <div className="h-auto flex-1">
              <div>
                <MainDescription description={data.description} />
              </div>
              {/*// KEEP FOR V2 */}
              {/*<div className="h-[1500px] flex-1 bg-blue-500" id={"tracks"}>*/}
              {/*  tracks*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </Wrapper>
    </ScrollableView>
  );
}
