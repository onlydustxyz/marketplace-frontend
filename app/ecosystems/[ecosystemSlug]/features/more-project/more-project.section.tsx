import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { MoreProject } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project";
import { TMoreProject } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project.types";
import { Section } from "app/ecosystems/components/section/section";

import { cn } from "src/utils/cn";

export async function MoreProjectSection({ ecosystemSlug, className }: TMoreProject.MoreProjectSectionProps) {
  const [hotCommunityProjects, newbiesWelcomeProjects, fastAndFuriousProjects] = await Promise.all([
    ecosystemsApiClient.fetch
      .getEcosystemProjectBySlug(
        { ecosystemSlug },
        { tag: "HOT_COMMUNITY" },
        {
          pageSize: 3,
          pageIndex: 0,
        }
      )
      .request()
      .then(res => {
        return {
          projects: res.projects,
          hasMore: res.hasMore,
        };
      }),
    ecosystemsApiClient.fetch
      .getEcosystemProjectBySlug(
        { ecosystemSlug },
        { tag: "NEWBIES_WELCOME" },
        {
          pageSize: 3,
          pageIndex: 0,
        }
      )
      .request()
      .then(res => {
        return {
          projects: res.projects,
          hasMore: res.hasMore,
        };
      }),
    ecosystemsApiClient.fetch
      .getEcosystemProjectBySlug(
        { ecosystemSlug },
        { tag: "FAST_AND_FURIOUS" },
        {
          pageSize: 3,
          pageIndex: 0,
        }
      )
      .request()
      .then(res => {
        return {
          projects: res.projects,
          hasMore: res.hasMore,
        };
      }),
  ]);

  if (
    !hotCommunityProjects.projects.length &&
    !newbiesWelcomeProjects.projects.length &&
    !fastAndFuriousProjects.projects.length
  )
    return null;

  return (
    <Section
      iconProps={{ remixName: "ri-folder-3-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.moreProjects.title" } }}
    >
      <div
        className={cn("grid gap-4 lg:grid-cols-2", {
          "lg:grid-cols-3":
            hotCommunityProjects.projects.length &&
            newbiesWelcomeProjects.projects.length &&
            fastAndFuriousProjects.projects.length,
        })}
      >
        <MoreProject
          tag={"NEWBIES_WELCOME"}
          projects={hotCommunityProjects.projects}
          hasMore={hotCommunityProjects.hasMore}
          className={className}
        />
        <MoreProject
          tag={"HOT_COMMUNITY"}
          projects={newbiesWelcomeProjects.projects}
          hasMore={newbiesWelcomeProjects.hasMore}
          className={className}
        />
        <MoreProject
          tag={"FAST_AND_FURIOUS"}
          projects={fastAndFuriousProjects.projects}
          hasMore={fastAndFuriousProjects.hasMore}
          className={className}
        />
      </div>
    </Section>
  );
}
