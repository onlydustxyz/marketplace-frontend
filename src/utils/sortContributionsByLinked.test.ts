import { OrderBy } from "src/__generated/graphql";
import { sortContributionsByLinked } from "./sortContributionsByLinked";

const mockContributions: Parameters<typeof sortContributionsByLinked>[0][0][] = [
  {
    id: "70baa44b953e8addcb0945fcb78e0e827feac5a82d1b7b716ed87f85142348dd",
    createdAt: "2023-09-18T16:41:40Z",
    completedAt: "2023-10-02T11:55:52Z",
    type: "PULL_REQUEST",
    status: "COMPLETED",
    githubNumber: 1242,
    githubTitle: "E 655 build my contributions list",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1242",
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [],
    rewardIds: ["ac1629dc-5918-416e-a23a-11e482bf389e"],
  },
  {
    id: "3af7758eb881ce3d2b386de98e7dfd8acf1afdf16bfabde93a2a0e39d7dce33a",
    createdAt: "2023-09-18T19:24:42Z",
    completedAt: "2023-09-22T14:53:54Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1244,
    githubTitle: "feat: added code reviews rewards",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1244",
    githubBody:
      '\r\n<img width="586" alt="Capture d’écran 2023-09-18 à 19 26 17" src="https://github.com/onlydustxyz/marketplace/assets/31901905/02bc4f96-cdb8-429f-a78e-bd9260cbdb60">\r\n\r\nhttps://linear.app/onlydust/issue/E-626/show-details-of-unrewarded-complete-contributions-to-project-leads\r\n\r\nAdd Code Reviews to Rewards ',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "373e6368fda9cebbb2a6cc1a6677bd87b4541a95d9962544dfc9baca054145bc",
        createdAt: "2023-09-18T19:24:42Z",
        completedAt: "2023-09-22T15:45:30Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1244,
        githubTitle: "feat: added code reviews rewards",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1244",
        githubBody:
          '\r\n<img width="586" alt="Capture d’écran 2023-09-18 à 19 26 17" src="https://github.com/onlydustxyz/marketplace/assets/31901905/02bc4f96-cdb8-429f-a78e-bd9260cbdb60">\r\n\r\nhttps://linear.app/onlydust/issue/E-626/show-details-of-unrewarded-complete-contributions-to-project-leads\r\n\r\nAdd Code Reviews to Rewards ',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "b8cbf55251d494909698951dbd2acbd5abe91dbaa5a85539cc99ab576860f1c2",
    createdAt: "2023-09-22T16:04:48Z",
    completedAt: "2023-09-22T16:40:46Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1259,
    githubTitle: "[E 626] Search fix",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1259",
    githubBody: "Fix search in Code Reviews reward side panel",
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "14fa2b517cac5f899532c1463e4cb013c6235be222c19b2d824ec3ecd075b63c",
        createdAt: "2023-09-22T16:04:48Z",
        completedAt: "2023-09-22T17:25:55Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1259,
        githubTitle: "[E 626] Search fix",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1259",
        githubBody: "Fix search in Code Reviews reward side panel",
        is_mine: false,
      },
      {
        id: "7c64bf41cc64a293adfbcdd93c8af5cf0624d75fdc3d1efe50b5f03c065f67a7",
        createdAt: "2023-09-22T16:04:48Z",
        completedAt: "2023-09-22T17:25:55Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1259,
        githubTitle: "[E 626] Search fix",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1259",
        githubBody: "Fix search in Code Reviews reward side panel",
        is_mine: false,
      },
      {
        id: "2884dc233c8512d062d7dd0b60d78d58e416349bf0a3e1feddff1183a01895e8",
        createdAt: "2023-09-22T16:04:48Z",
        completedAt: "2023-09-22T17:25:55Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1259,
        githubTitle: "[E 626] Search fix",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1259",
        githubBody: "Fix search in Code Reviews reward side panel",
        is_mine: false,
      },
      {
        id: "49d9387bfa24fb68faf9295320a9f716ed02417b6a5c943745a90541ffdc0485",
        createdAt: "2023-09-22T16:04:48Z",
        completedAt: "2023-09-22T17:25:55Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1259,
        githubTitle: "[E 626] Search fix",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1259",
        githubBody: "Fix search in Code Reviews reward side panel",
        is_mine: false,
      },
      {
        id: "9c4e5a60af2ed03a67a235adc3902400008290a743ab7196a498a6add8c987ba",
        createdAt: "2023-09-22T16:04:48Z",
        completedAt: "2023-09-22T17:25:55Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1259,
        githubTitle: "[E 626] Search fix",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1259",
        githubBody: "Fix search in Code Reviews reward side panel",
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "aec2a1b4f7c5dafce6a8b1da1360308246840e728bd37c34b4c891405c032abf",
    createdAt: "2023-09-22T18:11:54Z",
    completedAt: "2023-09-26T15:42:53Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1260,
    githubTitle: "[E-626] Contributions: Code Reviews QA ",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1260",
    githubBody:
      "- [x] Fix completed code review icon size (12px -> 16px) \r\n- [x] Wrap Tags for reponsivness in AutoAdd component\r\n- [x] Prevent truncating Github contributions titles\r\n\r\n",
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "0687ef61473ff6019e7ede0cb565549b63592a99dcf0c2299d7660fe277ad21a",
        createdAt: "2023-09-22T18:11:54Z",
        completedAt: "2023-09-26T16:06:59Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1260,
        githubTitle: "[E-626] Contributions: Code Reviews QA ",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1260",
        githubBody:
          "- [x] Fix completed code review icon size (12px -> 16px) \r\n- [x] Wrap Tags for reponsivness in AutoAdd component\r\n- [x] Prevent truncating Github contributions titles\r\n\r\n",
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "79b74106bd3d576a592a903d2975006ca3f709ce9c779a783fdbd9f2221f7f22",
    createdAt: "2023-09-22T18:38:47Z",
    completedAt: "2023-09-23T21:00:36Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1261,
    githubTitle: "[E-758] Filters box colors",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1261",
    githubBody:
      '<img width="339" alt="Capture d’écran 2023-09-22 à 18 37 50" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/15bdb1d3-0a94-4e2f-a76a-317a2ffa337f">\r\n\r\n- [x] Standardize bg colors on all filters buttons ',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "fc1203a480ff3f3a2d736e58a13c13204a7b90d981ee4f44f47908251dd11271",
        createdAt: "2023-09-22T18:38:47Z",
        completedAt: "2023-09-25T09:24:45Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1261,
        githubTitle: "[E-758] Filters box colors",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1261",
        githubBody:
          '<img width="339" alt="Capture d’écran 2023-09-22 à 18 37 50" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/15bdb1d3-0a94-4e2f-a76a-317a2ffa337f">\r\n\r\n- [x] Standardize bg colors on all filters buttons ',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "6f120c47015a26fbbc14582cd0d2f4db6e6d4d9d49f05bb7ad62b19f3dc621f1",
    createdAt: "2023-09-25T12:18:54Z",
    completedAt: "2023-09-25T14:21:20Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1262,
    githubTitle: "[E 759] Set pending lead invite project card background",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1262",
    githubBody:
      '<img width="882" alt="Capture d’écran 2023-09-25 à 11 54 46" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/c5e5ebad-8bd7-496f-985a-5ed10e8d23bd">\r\n\r\n- [x] Add orange-800 color to tailwind theme\r\n- [x] Set pending lead project card invite bg colors\r\n- [x] Add 20px top margin when pending invite project is the first element of the list\r\n\r\n\r\n',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "1190404d15892ca7f1ccb46bb1ab02525cdbfdd2101c13f9a375ad6b5e74d820",
        createdAt: "2023-09-25T12:18:54Z",
        completedAt: "2023-09-25T15:18:21Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1262,
        githubTitle: "[E 759] Set pending lead invite project card background",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1262",
        githubBody:
          '<img width="882" alt="Capture d’écran 2023-09-25 à 11 54 46" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/c5e5ebad-8bd7-496f-985a-5ed10e8d23bd">\r\n\r\n- [x] Add orange-800 color to tailwind theme\r\n- [x] Set pending lead project card invite bg colors\r\n- [x] Add 20px top margin when pending invite project is the first element of the list\r\n\r\n\r\n',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "e3ce017378c39932c081fba11027e87bca0650b3345d644d948b3b762abe3ce1",
    createdAt: "2023-09-25T14:42:55Z",
    completedAt: "2023-09-27T09:57:23Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1263,
    githubTitle: "[E-760] Feedback button styling",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1263",
    githubBody:
      '<img width="148" alt="Capture d’écran 2023-09-25 à 14 41 16" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/2b7fdd76-66bf-44bb-9278-91c2a7a57eb0">\r\n\r\n- [x] Background color `bg-white/5` \r\n- [x] Stroke color `border-greyscale-50` / active `spacePurple-200`\r\n- [x] Active text color `spacePurple-100`',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "0b551d0bec1894e81ab8043520413348b6c057fab61ee6209721b7e4dcd75cb9",
        createdAt: "2023-09-25T14:42:55Z",
        completedAt: "2023-09-27T15:49:18Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1263,
        githubTitle: "[E-760] Feedback button styling",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1263",
        githubBody:
          '<img width="148" alt="Capture d’écran 2023-09-25 à 14 41 16" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/2b7fdd76-66bf-44bb-9278-91c2a7a57eb0">\r\n\r\n- [x] Background color `bg-white/5` \r\n- [x] Stroke color `border-greyscale-50` / active `spacePurple-200`\r\n- [x] Active text color `spacePurple-100`',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "a613526bc0f43a2fc9f8f02b3befbde30554c0e9a24170b2660bb56e7e7ed7d8",
    createdAt: "2023-09-25T17:49:00Z",
    completedAt: "2023-09-26T09:11:29Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1264,
    githubTitle: "Add custom classnames component with class merging",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1264",
    githubBody:
      '[Why tailwind-merge](https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/what-is-it-for.md#thanks-but-i-prefer-to-read)\r\n\r\n```\r\n// ❌ div background stays black\r\n<div className={classNames("bg-black", "bg-white")} /> \r\n\r\n// \uD83D\uDFE2 div background changes to white\r\n<div className={cn("bg-back", "bg-white")} />  \r\n\r\n```\r\n\r\nTo prevent tailwind to depend on CSS cascade when dealing with conflicting classes we could use `tailwind-merge` to remove all conflicting classes with a custom classNames() utility \r\n\r\nWe still should use `classNames()` for cases when we do not want to merge classNames, for exemple for multiple backgrounds (bg-color + bg-image)\r\n```\r\n<div className={classNames("bg-noise-light", "bg-spaceBlue-600")} /> \r\n```\r\n\r\n\r\n\r\n- [x] Add a custom className component `cn()`  in utils \r\n- [x] Find/replace all occurrences of classNames()\r\n\r\n',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "cc5f484bc8cdaf475b319004c9a288b784ef86cbe4f02af8b6957cd5f62c3150",
        createdAt: "2023-09-25T17:49:00Z",
        completedAt: "2023-10-05T16:38:29Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1264,
        githubTitle: "Add custom classnames component with class merging",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1264",
        githubBody:
          '[Why tailwind-merge](https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/what-is-it-for.md#thanks-but-i-prefer-to-read)\r\n\r\n```\r\n// ❌ div background stays black\r\n<div className={classNames("bg-black", "bg-white")} /> \r\n\r\n// \uD83D\uDFE2 div background changes to white\r\n<div className={cn("bg-back", "bg-white")} />  \r\n\r\n```\r\n\r\nTo prevent tailwind to depend on CSS cascade when dealing with conflicting classes we could use `tailwind-merge` to remove all conflicting classes with a custom classNames() utility \r\n\r\nWe still should use `classNames()` for cases when we do not want to merge classNames, for exemple for multiple backgrounds (bg-color + bg-image)\r\n```\r\n<div className={classNames("bg-noise-light", "bg-spaceBlue-600")} /> \r\n```\r\n\r\n\r\n\r\n- [x] Add a custom className component `cn()`  in utils \r\n- [x] Find/replace all occurrences of classNames()\r\n\r\n',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "01225ef7198e8096cc13d591b2f3917302a272e52c3b58e9f1b41d2cc49f887f",
    createdAt: "2023-09-27T15:19:14Z",
    completedAt: "2023-09-27T16:08:12Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1265,
    githubTitle: "[E-759] Revamp projects cards with pending invite",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1265",
    githubBody:
      '<img width="874" alt="Capture d’écran 2023-09-27 à 15 17 18" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/df817fe5-0d0f-473b-93e0-22a730152fd6">\r\n\r\n- [x] Revamp ProjectLeadInvitation component\r\n- [x] Add variants in storybook\r\n- [x] Re-use component in ProjectDetails & ProjectsCards \r\n',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "e9cee7d1cebac4de5649b66504d99cfddff83af94f09ca541f0b617f525f046c",
        createdAt: "2023-09-27T15:19:14Z",
        completedAt: "2023-09-27T16:43:20Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1265,
        githubTitle: "[E-759] Revamp projects cards with pending invite",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1265",
        githubBody:
          '<img width="874" alt="Capture d’écran 2023-09-27 à 15 17 18" src="https://github.com/onlydustxyz/marketplace-frontend/assets/31901905/df817fe5-0d0f-473b-93e0-22a730152fd6">\r\n\r\n- [x] Revamp ProjectLeadInvitation component\r\n- [x] Add variants in storybook\r\n- [x] Re-use component in ProjectDetails & ProjectsCards \r\n',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
  {
    id: "3e41376ca3596e96b3b4771bc8aea59a97b47bbdcfa58e48324b9a8feb0ad4d2",
    createdAt: "2023-09-27T16:59:00Z",
    completedAt: "2023-09-27T17:05:21Z",
    type: "CODE_REVIEW",
    status: "COMPLETED",
    githubNumber: 1266,
    githubTitle: "[E-626] QA Review",
    githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1266",
    githubBody:
      '- [x] Fixed tooltip positionning issue\r\n- [x] Commits count plurialization \r\n- [x] Display add contribution validation error\r\n- [x] Clickable commits count tooltip for PR\r\n- [x] Do not display "External contribution add" for Code Reviews',
    projectName: "OnlyDust",
    repoName: "marketplace-frontend",
    links: [
      {
        id: "68a3765d47beaededcd1e595980b721944591c394e6eb6d150010f93ee507461",
        createdAt: "2023-09-27T16:59:00Z",
        completedAt: "2023-09-28T12:36:03Z",
        type: "PULL_REQUEST",
        status: "COMPLETED",
        githubNumber: 1266,
        githubTitle: "[E-626] QA Review",
        githubHtmlUrl: "https://github.com/onlydustxyz/marketplace-frontend/pull/1266",
        githubBody:
          '- [x] Fixed tooltip positionning issue\r\n- [x] Commits count plurialization \r\n- [x] Display add contribution validation error\r\n- [x] Clickable commits count tooltip for PR\r\n- [x] Do not display "External contribution add" for Code Reviews',
        is_mine: false,
      },
    ],
    rewardIds: [],
  },
];

describe("sortContributionsByLinked", () => {
  it("should sort by ascending", () => {
    const sorted = mockContributions.sort((a, b) => sortContributionsByLinked([a, b], OrderBy.Asc));

    const nbLinked = sorted.map(contribution => contribution.links?.length ?? 0);

    expect(nbLinked).toEqual([0, 1, 1, 1, 1, 1, 1, 1, 1, 5]);
  });

  it("should sort by descending", () => {
    const sorted = mockContributions.sort((a, b) => sortContributionsByLinked([a, b], OrderBy.Desc));

    const nbLinked = sorted.map(contribution => contribution.links?.length ?? 0);

    expect(nbLinked).toEqual([5, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
  });
});
