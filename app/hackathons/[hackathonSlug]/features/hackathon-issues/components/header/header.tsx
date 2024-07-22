"use client";

import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { HackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context";
import { THackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context.types";

import { Badge } from "components/atoms/badge";
import { ButtonSecondaryLight } from "components/atoms/button/variants/button-secondary-light";
import { Input } from "components/atoms/input";
import { Popover } from "components/atoms/popover";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";
import { CheckboxButton } from "components/molecules/checkbox-button";
import { RadioButtonGroup } from "components/molecules/radio-button-group";

import { useIntl } from "hooks/translate/use-translate";

export function Header() {
  const { T } = useIntl();

  const {
    issues: { close },
  } = useContext(HackathonContext);

  const {
    filters: {
      count,
      set,
      clear,
      values: { search, assigned, languageIds },
      options: { languages },
    },
  } = useContext(HackathonIssuesContext);

  function handleSearch(value: string) {
    set({ search: value });
  }

  function handleLanguages(languageId: string, checked: boolean) {
    if (checked) {
      set({ languageIds: [...languageIds, languageId] });
    } else {
      set({ languageIds: languageIds.filter(id => id !== languageId) });
    }
  }

  function handleAssigned(value: THackathonIssuesContext.FilterAssigned) {
    set({ assigned: value });
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Popover>
        <Popover.Trigger>
          {() => (
            <div>
              <ButtonSecondaryLight
                size="l"
                startIcon={{ remixName: "ri-filter-3-line" }}
                translate={{ token: "v2.pages.hackathons.details.issues.filters.button" }}
                endContent={
                  <>
                    {count ? (
                      <Badge size="s" style="outline">
                        {count}
                      </Badge>
                    ) : null}
                  </>
                }
              />
            </div>
          )}
        </Popover.Trigger>

        <Popover.Content>
          {() => (
            <div className="flex max-w-[360px] flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <Typo translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.title" }} />
                <ButtonSecondaryLight
                  onClick={clear}
                  size="s"
                  translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.clear" }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="text-2"
                  translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.languages" }}
                />
                <div className="flex flex-wrap gap-1">
                  {languages.map(language => (
                    <CheckboxButton
                      key={language.id}
                      value={languageIds.includes(language.id)}
                      onChange={checked => handleLanguages(language.id, checked)}
                    >
                      {language.name}
                    </CheckboxButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Typo
                  size="xs"
                  color="text-2"
                  translate={{ token: "v2.pages.hackathons.details.issues.filters.modal.languages" }}
                />
                <RadioButtonGroup
                  items={[
                    { label: T("v2.pages.hackathons.details.issues.filters.modal.issuesStates.all"), value: "all" },
                    {
                      label: T("v2.pages.hackathons.details.issues.filters.modal.issuesStates.available"),
                      value: "available",
                    },
                    {
                      label: T("v2.pages.hackathons.details.issues.filters.modal.issuesStates.notAvailable"),
                      value: "notAvailable",
                    },
                  ]}
                  value={assigned}
                  onChange={handleAssigned}
                />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>

      <Input
        value={search}
        onChange={e => handleSearch(e.target.value)}
        startContent={<Icon remixName="ri-search-line" className="text-text-2" />}
        placeholder={T("v2.pages.hackathons.details.issues.filters.search")}
      />

      <div>
        <ButtonSecondaryLight
          onClick={close}
          size="l"
          hideText
          startIcon={{
            remixName: "ri-close-line",
          }}
        />
      </div>
    </div>
  );
}
