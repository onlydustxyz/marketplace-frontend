import { differenceInDays } from "date-fns";
import { FormEvent, lazy, useMemo, useState } from "react";

import { ApplyIssueCard } from "app/p/[slug]/components/apply-issue-card/apply-issue-card";
import { TApplyIssueDrawer } from "app/p/[slug]/features/apply-issue-drawer/apply-issue-drawer.types";

import { Button } from "components/atoms/button/variants/button-default";
import { Tag } from "components/atoms/tag";
import { TagAvatar } from "components/atoms/tag/variants/tag-avatar";
import { TagIcon } from "components/atoms/tag/variants/tag-icon";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";
import { Drawer } from "components/molecules/drawer";

const MarkdownPreview = lazy(() => import("src/components/MarkdownPreview"));

export function ApplyIssueDrawer({ issue, hasApplied = true }: TApplyIssueDrawer.Props) {
  const [isOpen, setIsOpen] = useState(false);

  console.log({ issue });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert("Submitted!");
  }

  const header = useMemo(() => {
    const StartContent = (
      <div className={"flex items-center gap-2"}>
        <TagAvatar
          shape={"square"}
          style={"outline"}
          color={"grey"}
          avatar={{ src: issue.author.avatarUrl, shape: "square" }}
        >
          {issue.author.login}
        </TagAvatar>
        <TagAvatar shape={"square"} style={"outline"} color={"grey"} avatar={{ src: "", shape: "square" }}>
          Project name
        </TagAvatar>
      </div>
    );

    const EndContent = hasApplied ? (
      <Button
        as={BaseLink}
        htmlProps={{ href: issue.htmlUrl }}
        startIcon={{ remixName: "ri-github-line" }}
        variant={"secondary-light"}
        size={"l"}
      >
        <Translate token={"v2.features.projects.applyIssueDrawer.header.seeOnGithub"} />
      </Button>
    ) : null;

    return {
      startContent: StartContent,
      endContent: EndContent,
    };
  }, []);

  const footer = useMemo(() => {
    const StartContent = hasApplied ? (
      <TagIcon
        icon={{ remixName: "ri-checkbox-circle-fill" }}
        color={"purple"}
        style={"outline"}
        classNames={{ base: "hidden sm:block" }}
      >
        <Translate token={"v2.features.projects.applyIssueDrawer.footer.applied"} />
      </TagIcon>
    ) : null;

    const EndContent = hasApplied ? (
      <div className={"flex items-center gap-2.5"}>
        <Button variant={"danger"} size={"l"}>
          <Translate token={"v2.features.projects.applyIssueDrawer.footer.cancelApplication"} />
        </Button>
        <Button size={"l"} isDisabled>
          <Translate token={"v2.features.projects.applyIssueDrawer.footer.alreadyApplied"} />
        </Button>
      </div>
    ) : (
      <Button type={"submit"} size={"l"}>
        <Translate token={"v2.features.projects.applyIssueDrawer.footer.sendAnApplication"} />
      </Button>
    );

    return {
      startContent: StartContent,
      endContent: EndContent,
    };
  }, [hasApplied]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        as={"form"}
        htmlProps={{
          onSubmit: handleSubmit,
        }}
        header={header}
        footer={footer}
      >
        <div className={"grid gap-4"}>
          <Typo size={"2xl"} variant={"brand"} color={"text-1"}>
            {issue.title}
          </Typo>

          <div className={"grid grid-cols-6 gap-4"}>
            <ApplyIssueCard
              iconProps={{ remixName: "ri-code-line" }}
              titleProps={{
                translate: {
                  token: "v2.features.projects.applyIssueDrawer.sections.languages",
                },
              }}
              className={"col-span-3"}
            >
              {/* TODO @hayden */}
              <div className="pt-2">Languages</div>
            </ApplyIssueCard>
            <ApplyIssueCard
              iconProps={{ remixName: "ri-price-tag-3-line" }}
              titleProps={{
                translate: {
                  token: "v2.features.projects.applyIssueDrawer.sections.labels",
                },
              }}
              className={"col-span-3"}
            >
              <div className="pt-2">
                {issue.labels ? (
                  <ul className={"flex flex-wrap gap-2"}>
                    {issue.labels.map(label => (
                      <li key={label.name}>
                        <Tag style={"outline"} color={"grey"} size={"xs"}>
                          {label.name}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </ApplyIssueCard>

            <ApplyIssueCard
              iconProps={{ remixName: "ri-discuss-line" }}
              titleProps={{
                translate: {
                  token: "v2.features.projects.applyIssueDrawer.sections.applicants",
                },
              }}
              container={"3"}
              className={"col-span-2"}
            >
              <div className="pt-2">
                <Typo variant={"brand"} size={"4xl"}>
                  {issue.applicants.length}
                </Typo>
              </div>
            </ApplyIssueCard>
            <ApplyIssueCard
              iconProps={{ remixName: "ri-fire-line" }}
              titleProps={{
                translate: {
                  token: "v2.features.projects.applyIssueDrawer.sections.comments",
                },
              }}
              container={"3"}
              className={"col-span-2"}
            >
              <div className="pt-2">
                <Typo variant={"brand"} size={"4xl"}>
                  {issue.commentCount}
                </Typo>
              </div>
            </ApplyIssueCard>
            <ApplyIssueCard
              iconProps={{ remixName: "ri-time-line" }}
              titleProps={{
                translate: {
                  token: "v2.features.projects.applyIssueDrawer.sections.days",
                },
              }}
              container={"3"}
              className={"col-span-2"}
            >
              <div className="pt-2">
                <Typo variant={"brand"} size={"4xl"}>
                  {differenceInDays(new Date(), new Date(issue.createdAt))}
                </Typo>
              </div>
            </ApplyIssueCard>

            {issue.body ? (
              <ApplyIssueCard
                iconProps={{ remixName: "ri-bill-line" }}
                titleProps={{
                  translate: {
                    token: "v2.features.projects.applyIssueDrawer.sections.description",
                  },
                }}
                className={"col-span-full"}
              >
                <MarkdownPreview className={"pt-3 text-sm"}>{issue.body}</MarkdownPreview>
              </ApplyIssueCard>
            ) : null}

            <ApplyIssueCard
              iconProps={{ remixName: "ri-bill-line" }}
              titleProps={{
                translate: {
                  token: "v2.features.projects.applyIssueDrawer.sections.applicationForm.title",
                },
              }}
              className={"col-span-full"}
            >
              <div className="pt-3">Form here</div>
            </ApplyIssueCard>
          </div>
        </div>
      </Drawer>
    </>
  );
}
