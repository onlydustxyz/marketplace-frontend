import { Button } from "components/ds/button/button";
import { CalloutAlert } from "components/ds/callout-alert/callout-alert";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TAddMissingRepositories } from "./add-missing-repositories.types";

export function AddMissingRepositories({
  url,
  disabled,
  tooltip,
  backgroundColor,
  className,
}: TAddMissingRepositories.Props) {
  return (
    <CalloutAlert className={className}>
      <Flex className="gap-4" alignItems="center">
        <Flex alignItems="center" justifyContent="center" className="h-8 w-8 rounded-large bg-white/8 p-2">
          <Icon remixName="ri-error-warning-line" size={16} />
        </Flex>

        <Flex direction="col">
          <Typography variant="body-s-bold">
            <Translate token="callout.missingRepositories.title" />
          </Typography>

          <Typography variant="body-xs">
            <Translate token="callout.missingRepositories.description" />
          </Typography>
        </Flex>
      </Flex>

      {disabled ? (
        <Tooltip content={tooltip}>
          <Button size="s" className="whitespace-nowrap" backgroundColor={backgroundColor} disabled>
            <Translate token="callout.missingRepositories.button" />
          </Button>
        </Tooltip>
      ) : (
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noreferrer"
          size="s"
          className="whitespace-nowrap"
          backgroundColor={backgroundColor}
        >
          <Translate token="callout.missingRepositories.button" />
        </Button>
      )}
    </CalloutAlert>
  );
}
