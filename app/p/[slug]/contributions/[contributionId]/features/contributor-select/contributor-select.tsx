import { useMemo } from "react";

import { ShowMore } from "src/components/Table/ShowMore";

import { Card } from "components/ds/card/card";
import { Input } from "components/ds/form/input/input";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";
import { AccordionItemWithBadgeProps } from "components/molecules/accordion";
import { AccordionWithBadge } from "components/molecules/accordion/variants/accordion-with-badge";

import { useIntl } from "hooks/translate/use-translate";

import { ApplicantCard } from "./components/applicant-card/applicant-card";
import { TContributorSelect } from "./contributor-select.types";

export function ContributorSelect({
  search,
  setSearch,
  selectedUser,
  handleSelectUser,
  newComers,
  projectMembers,
}: TContributorSelect.Props) {
  const { T } = useIntl();

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return [
      newComers.applications?.length
        ? {
            id: "new-comers",
            titleProps: {
              children: <Translate token="v2.pages.project.details.applicationDetails.select.new" />,
            },
            content: (
              <Flex direction="col" className="gap-2">
                {newComers.applications?.map(application => (
                  <ApplicantCard
                    key={application.id}
                    applicationId={application.id}
                    user={application.applicant}
                    recommandationScore={application.recommandationScore}
                    selectedUser={selectedUser}
                    handleSelectUser={handleSelectUser}
                  />
                ))}

                {newComers.hasNextPage ? (
                  <ShowMore onClick={newComers.fetchNextPage} loading={newComers.isFetchingNextPage} />
                ) : null}
              </Flex>
            ),
            badgeProps: {
              children: newComers.applications?.length,
            },
          }
        : null,
      projectMembers.applications?.length
        ? {
            id: "project-members",
            titleProps: {
              children: <Translate token="v2.pages.project.details.applicationDetails.select.project" />,
            },
            content: (
              <Flex direction="col" className="gap-2">
                {projectMembers.applications?.map(application => (
                  <ApplicantCard
                    key={application.id}
                    applicationId={application.id}
                    user={application.applicant}
                    recommandationScore={application.recommandationScore}
                    selectedUser={selectedUser}
                    handleSelectUser={handleSelectUser}
                  />
                ))}

                {projectMembers.hasNextPage ? (
                  <ShowMore onClick={projectMembers.fetchNextPage} loading={projectMembers.isFetchingNextPage} />
                ) : null}
              </Flex>
            ),
            badgeProps: {
              children: projectMembers.applications?.length,
            },
          }
        : null,
    ].filter(item => item !== null) as AccordionItemWithBadgeProps[];
  }, [newComers.applications, projectMembers.applications, selectedUser]);

  const defaultSelected = useMemo(() => items.map(item => item.id), [items]);

  function handleSearch(value: string) {
    setSearch(value);
  }

  return (
    <div className="h-full min-w-[320px] max-w-[320px]">
      <Card background="base" hasPadding={false} border={false} className="rounded-lg">
        <Flex direction="col" className="gap-4 p-3">
          <Input
            value={search}
            onChange={e => handleSearch(e.target.value)}
            startContent={<Icon remixName="ri-search-line" className="text-spaceBlue-200" />}
            placeholder={T("v2.pages.project.details.applicationDetails.select.search")}
          />

          {items.length ? (
            <AccordionWithBadge items={items} defaultSelected={defaultSelected} selectionMode="multiple" />
          ) : (
            <Flex direction="col" alignItems="center" className="gap-1 py-2">
              <Typography
                variant="title-s"
                translate={{ token: "v2.pages.project.details.applicationDetails.select.empty.title" }}
              />

              <Typography
                variant="body-s"
                translate={{ token: "v2.pages.project.details.applicationDetails.select.empty.description" }}
              />
            </Flex>
          )}
        </Flex>
      </Card>
    </div>
  );
}
