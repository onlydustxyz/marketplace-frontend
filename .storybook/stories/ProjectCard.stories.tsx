import { ComponentProps } from "react";
import ProjectCard from "src/components/ProjectCard";
import Tooltip from "src/components/Tooltip";
import { responsiveChromatic } from "src/test/utils";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ProjectCard",
  parameters: responsiveChromatic,
  decorators: [withAuthProvider({ userId: USER_ID }), withRouter, withContributorProfilePanelProvider],
};

export const Default = {
  render: () => (
    <>
      <ProjectCard project={{ ...props(args).project }} />
      <Tooltip />
    </>
  ),
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const Hiring = {
  render: () => (
    <>
      <ProjectCard
        project={{
          ...props({
            ...args,
            hiring: true,
            sponsorsCount: 1,
          }).project,
        }}
      />
      <Tooltip />
    </>
  ),
  parameters: {
    backgrounds: { default: "space" },
  },
};

export const Private = {
  render: () => (
    <>
      <ProjectCard
        project={{
          ...props({ ...args, visibility: "PRIVATE", sponsorsCount: 0 }).project,
        }}
      />
      <Tooltip />
    </>
  ),
  parameters: {
    backgrounds: { default: "space" },
  },
};

type ProjectCardProps = ComponentProps<typeof ProjectCard>;

const props = (args: {
  name: string;
  shortDescription: string;
  projectLeadsCount: number;
  hiring: boolean;
  visibility: ProjectCardProps["project"]["visibility"];
  sponsorsCount: number;
}): ComponentProps<typeof ProjectCard> => ({
  project: {
    id: "cdb45d97-13a6-4f71-8c8c-78917fc02649",
    slug: "performance-test-with-a-very-long-name",
    name: args.name,
    shortDescription: args.shortDescription,
    logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/1409408835957028656.png",
    hiring: args.hiring,
    visibility: args.visibility,
    repoCount: 2,
    contributorCount: 3,
    leaders: [
      {
        githubUserId: 98735421,
        login: "AnthonyBuisset",
        htmlUrl: "",
        avatarUrl: "https://avatars.githubusercontent.com/u/43467246?v=4",
        id: "adcb11a6-92cf-4a1e-bace-79f7bdbc54e7",
      },
      {
        githubUserId: 98735421,
        login: "ofux",
        htmlUrl: "",
        avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
        id: "bd365490-dd23-4a24-ad23-7853fbd853c2",
      },
    ].slice(0, args.projectLeadsCount),
    sponsors: [
      {
        id: "ce038af0-9f8d-4948-bd5a-1c86cf983041",
        name: "OnlyDust",
        url: "",
        logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      },
      {
        id: "ce038af0-9f8d-4948-bd5a-1c86cf983042",
        name: "OnlyFast",
        url: "",
        logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      },
      {
        id: "ce038af0-9f8d-4948-bd5a-1c86cf983043",
        name: "OnlyRust",
        url: "",
        logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13878645251970159319.jpg",
      },
    ].slice(0, args.sponsorsCount),
    technologies: {
      Java: 1082,
      CPlusPlus: 22688656,
      CSS: 128024,
      C: 3655312,
      Scheme: 50648,
      CMake: 115552,
      ObjectiveCPlusPlus: 10994,
      QMake: 876,
      Makefile: 298032,
      M4: 435994,
      HTML: 285238,
      Sage: 118798,
      TypeScript: 42942,
      Dockerfile: 9068,
      Shell: 367042,
      CoffeeScript: 34960,
      CapnProto: 2512,
      JavaScript: 8236948,
      Assembly: 56732,
      Python: 6840986,
    },
    isInvitedAsProjectLead: false,
  },
});

const args = {
  name: "ZeroSync",
  shortDescription:
    "Don't trust. Verify. ZeroSync allows to verify Bitcoin's chain state in an instant. No need to download hundreds of gigabytes of blocks. A compact cryptographic proof suffices to validate the entire history of transactions and everyone's current balances.",
  withInvitation: false,
  projectLeadsCount: 1,
  hiring: false,
  rank: 0,
  visibility: "PUBLIC" as ProjectCardProps["project"]["visibility"],
  sponsorsCount: 3,
};
