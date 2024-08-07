"use client";

import { bootstrap } from "core/bootstrap";

import { Button } from "components/atoms/button/variants/button-default";
import { Link } from "components/atoms/link";
import { Popover } from "components/atoms/popover";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { TInfoDropdown } from "components/features/info-dropdown/info-dropdown.types";
import { Translate } from "components/layout/translate/translate";

export function InfoDropdown({ targetLabel, dropdownTitleToken, links }: TInfoDropdown.Props) {
  const urlHelperPort = bootstrap.getUrlHelperPort();
  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Tag as={"button"} style={"outline"} color={"white"} size={"s"} clickable={true} hasDropdown={true}>
              {targetLabel}
            </Tag>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {({ setIsOpen }) => (
          <div className={"grid gap-3"}>
            <div className={"flex items-center justify-between gap-3"}>
              <Typo size={"m"} translate={{ token: dropdownTitleToken }} />

              <Button variant={"secondary-light"} size={"s"} onClick={() => setIsOpen(false)}>
                <Translate token={"v2.pages.hackathons.details.info.close"} />
              </Button>
            </div>

            {links.map(l => {
              if (l.url) {
                const validUrl = l.url ? urlHelperPort.validateUrl(l.url) : "";
                return (
                  <Link key={l.url} href={validUrl}>
                    {l.value ?? validUrl}
                  </Link>
                );
              }

              if (l.value) {
                return (
                  <Typo key={l.value} size={"xs"}>
                    {l.value}
                  </Typo>
                );
              }

              return null;
            })}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
