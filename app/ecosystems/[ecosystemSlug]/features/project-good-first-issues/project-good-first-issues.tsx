"use client";

import { useMemo } from "react";

import { AvatarGroup } from "components/ds/avatar-group/avatar-group";
import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Container } from "components/layout/container/container";
import { Typography } from "components/layout/typography/typography";

const MAX_CONTRIBUTORS = 3;
function Project() {
  const avatars = [
    { avatarUrl: "", login: "ABC" },
    { avatarUrl: "", login: "DEF" },
    { avatarUrl: "", login: "GHI" },
    { avatarUrl: "", login: "JKL" },
    { avatarUrl: "", login: "MNO" },
  ];

  const displayContributors = useMemo(() => avatars.slice(0, 3), [avatars]);
  const nbContributors = useMemo(() => avatars.length, [avatars]);

  function handleClick() {
    alert("Check this project out 👌");
  }

  function renderTooltip() {
    return (
      <ul>
        {avatars.map((contributor, i) => (
          <li key={i}>
            {/* TODO @hayden get project list styles */}
            <Avatar.Labelled avatarProps={{ src: contributor.avatarUrl, size: "xs" }}>
              {contributor.login}
            </Avatar.Labelled>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Card
      as={"article"}
      hasPadding={false}
      border={"heavy"}
      background={"medium"}
      className={"cursor-pointer shadow-medium"}
      onClick={handleClick}
    >
      <div className={"grid gap-5 p-5"}>
        <div className={"flex gap-4"}>
          <Avatar src={""} alt={"PROJECT NAME"} size={"xl"} shape={"square"} />

          <div className={"grid gap-1"}>
            <Typography variant={"title-s"} className={"truncate"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur autem cum delectus dolore
              eaque eligendi esse ipsum laboriosam maiores perferendis provident quaerat quam quia sed, similique
              tenetur, totam voluptate?
            </Typography>

            <Typography variant={"body-s"} className={"line-clamp-2 text-spaceBlue-200"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci atque eligendi est fugiat labore,
              maiores minus non odit porro quaerat quibusdam sapiente tempora totam ullam! Earum numquam officia qui?
            </Typography>
          </div>
        </div>

        <footer className={"flex items-center gap-3"}>
          {/* TODO @hayden */}
          <span>Tag</span>

          <Tooltip content={renderTooltip()}>
            <AvatarGroup
              avatars={displayContributors.map(contributor => ({
                src: contributor.avatarUrl,
                alt: contributor.login || "",
              }))}
              avatarProps={{
                size: "xs",
              }}
            />

            {nbContributors > MAX_CONTRIBUTORS ? (
              <Typography
                variant={"body-s"}
                className={"ml-1 text-spaceBlue-100"}
                translate={{
                  token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.contributors",
                  params: { count: nbContributors - MAX_CONTRIBUTORS },
                }}
              />
            ) : null}
          </Tooltip>
        </footer>
      </div>
    </Card>
  );
}

export function ProjectGoodFirstIssues() {
  return (
    <Container>
      <Card border={"multiColor"} background={"multiColor"} className={"grid gap-3 lg:grid-cols-3"}>
        <Project />
        <Project />
        <Project />
      </Card>
    </Container>
  );
}
