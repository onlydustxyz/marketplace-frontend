import { redirect } from "next/navigation";

import { ScrollableView } from "app/h/[slug]/clients/scrollable-view/scrollable-view";
import { Navigation } from "app/h/[slug]/components/navigation/navigation";
import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";
import { Intro } from "app/h/[slug]/features/intro/intro";
import { MainDescription } from "app/h/[slug]/features/main-description/main-description";
import { Overview } from "app/h/[slug]/features/overview/overview";
import { Tracks } from "app/h/[slug]/features/tracks/tracks";
import { mock } from "app/h/[slug]/mock";

import { Header } from "./components/header/header";

export default function HackathonPage({ params }: { params: { slug: string } }) {
  const { slug = "" } = params;
  const data = mock;

  if (data.slug !== params.slug) {
    redirect("/not-found");
  }

  return (
    <ScrollableView>
      <Header endDate={data.endDate} startDate={data.startDate} title={data.title} />
      <Navigation slug={slug} hasTracks={!!data.tracks.length} />
      <Wrapper className="max-md:p-2">
        <div className="flex w-full flex-col items-start justify-start gap-6 pb-6 pt-6 md:pt-14" id={"overview"}>
          <Intro title={data.title} subtitle={data.subtitle} />
          <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
            <div className="w-full md:w-[400px]">
              <Overview
                startDate={data.startDate}
                endDate={data.endDate}
                totalBudget={data.totalBudget}
                links={data.links}
                sponsors={data.sponsors}
                projects={data.projects}
              />
            </div>
            <div className="flex h-auto w-full flex-1 flex-col items-start justify-start gap-6">
              <MainDescription description={data.description} />
              <div className="w-full" id={"tracks"}>
                <Tracks data={mock.tracks} />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </ScrollableView>
  );
}
