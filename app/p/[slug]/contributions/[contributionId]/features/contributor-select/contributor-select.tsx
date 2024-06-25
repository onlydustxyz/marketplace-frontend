import { useMemo } from "react";

import { Card } from "components/ds/card/card";
import { Input } from "components/ds/form/input/input";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
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
  newComersApplications,
  projectMembersApplications,
}: TContributorSelect.Props) {
  const { T } = useIntl();

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return [
      newComersApplications?.length
        ? {
            id: "new-comers",
            titleProps: {
              children: <Translate token="v2.pages.project.details.applicationDetails.select.new" />,
            },
            content: (
              <Flex direction="col" className="gap-2">
                {newComersApplications?.map(application => (
                  <ApplicantCard
                    key={application.id}
                    user={application.applicant}
                    recommandationScore={application.recommandationScore}
                    selectedUser={selectedUser}
                    handleSelectUser={handleSelectUser}
                  />
                ))}
              </Flex>
            ),
            badgeProps: {
              children: newComersApplications?.length,
            },
          }
        : null,
      projectMembersApplications?.length
        ? {
            id: "project-members",
            titleProps: {
              children: <Translate token="v2.pages.project.details.applicationDetails.select.project" />,
            },
            content: (
              <Flex direction="col" className="gap-2">
                {projectMembersApplications?.map(application => (
                  <ApplicantCard
                    key={application.id}
                    user={application.applicant}
                    recommandationScore={application.recommandationScore}
                    selectedUser={selectedUser}
                    handleSelectUser={handleSelectUser}
                  />
                ))}
              </Flex>
            ),
            badgeProps: {
              children: projectMembersApplications?.length,
            },
          }
        : null,
    ].filter(item => item !== null);
  }, [newComersApplications, projectMembersApplications, selectedUser, handleSelectUser]);

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

          <AccordionWithBadge items={items} defaultSelected={defaultSelected} selectionMode="multiple" />
        </Flex>
      </Card>
    </div>
  );
}
