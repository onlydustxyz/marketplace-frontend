import { ScrollableView } from "app/h/[slug]/clients/scrollable-view/scrollable-view";
import { Navigation } from "app/h/[slug]/components/navigation/navigation";
import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";

import { components } from "src/__generated/api";

import { Header } from "./components/header/header";

const mock: components["schemas"]["HackathonsDetailsResponse"] = {
  description: "string",
  startDate: "2024-04-10T00:00:00Z",
  endDate: "2024-04-30T00:00:00Z",
  title: "ODHack #2.0",
  id: "e1dad47e-0b29-4198-8aec-9fc0ea5a649d",
  slug: "od-hack-2-0",
  links: [
    {
      url: "string",
      value: "string",
    },
  ],
  location: "string",
  me: {
    hasRegistered: false,
  },
  projects: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      logoUrl: "string",
      name: "string",
      slug: "my-awesome-project",
    },
  ],
  sponsors: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/8506434858363286425.png",
      name: "Ethereum Foundation",
      url: "https://ethereum.org",
    },
  ],
  subtitle: "string",
  totalBudget: "string",
  tracks: [
    {
      description: "string",
      iconSlug: "string",
      name: "string",
      projects: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/2529199823275297272.jpg",
          name: "Verkle Tries",
          shortDescription: "A short project description",
          slug: "my-awesome-project",
          visibility: "PRIVATE",
        },
      ],
      subtitle: "string",
    },
  ],
};

export default function HackathonPage({ params }: { params: { slug: string } }) {
  const { slug = "" } = params;

  return (
    <ScrollableView>
      <Header />
      <Navigation slug={slug} />
      <Wrapper>
        <div className={"flex w-full flex-row items-start justify-start gap-6 pt-6"}>
          <div className={"sticky left-0 top-6 h-12 w-[384px] bg-pink-500"}>sidecards</div>
          <div className={"h-auto flex-1 bg-blue-500"}>
            <div className={"h-[1500px] flex-1 bg-green-500"}>content 1</div>
            <div className={"h-[1500px] flex-1 bg-blue-500"} id={"tracks"}>
              tracks
            </div>
          </div>
        </div>
      </Wrapper>
    </ScrollableView>
  );
}
