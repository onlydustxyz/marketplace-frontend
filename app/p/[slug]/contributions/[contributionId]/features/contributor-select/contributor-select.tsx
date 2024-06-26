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

import { TUseApplications } from "../../hooks/use-applications/use-applications.types";
import { ApplicantCard } from "./components/applicant-card/applicant-card";
import { ApplicantCardLoading } from "./components/applicant-card/applicant-card.loading";
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

  function itemContent(applicants: TUseApplications.ApplicationItem) {
    if (applicants.isPending) {
      return (
        <Flex direction="col" className="gap-2">
          <ApplicantCardLoading />
          <ApplicantCardLoading />
          <ApplicantCardLoading />
        </Flex>
      );
    }

    return (
      <Flex direction="col" className="gap-2">
        {applicants.applications?.map(application => (
          <ApplicantCard
            key={application.id}
            applicationId={application.id}
            user={application.applicant}
            recommandationScore={application.recommandationScore}
            selectedUser={selectedUser}
            handleSelectUser={handleSelectUser}
          />
        ))}

        {applicants.hasNextPage ? (
          <ShowMore onClick={applicants.fetchNextPage} loading={applicants.isFetchingNextPage} />
        ) : null}
      </Flex>
    );
  }

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return [
      !newComers.applications?.length && !newComers.isPending
        ? null
        : {
            id: "new-comers",
            titleProps: {
              children: <Translate token="v2.pages.project.details.applicationDetails.select.new" />,
            },
            content: itemContent(newComers),
            badgeProps: {
              children: newComers.applications?.length,
            },
          },
      !projectMembers.applications?.length && !projectMembers.isPending
        ? null
        : {
            id: "project-members",
            titleProps: {
              children: <Translate token="v2.pages.project.details.applicationDetails.select.project" />,
            },
            content: itemContent(projectMembers),
            badgeProps: {
              children: projectMembers.applications?.length,
            },
          },
    ].filter(item => item !== null);
  }, [newComers.applications, projectMembers.applications]);

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

          {!items.length && !newComers.isPending && !projectMembers.isPending ? (
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
          ) : (
            <AccordionWithBadge
              items={items}
              defaultSelected={["new-comers", "project-members"]}
              selectionMode="multiple"
            />
          )}
        </Flex>
      </Card>
    </div>
  );
}
