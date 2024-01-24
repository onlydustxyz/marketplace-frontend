import { TAddMissingRepositories } from "./add-missing-repositories.types";
import { Icon } from "components/layout/icon/icon";
import { Button } from "components/ds/button/button";
import { CalloutAlert } from "components/ds/callout-alert/callout-alert";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import { Translate } from "components/layout/translate/translate";
import { withTooltip } from "src/components/Tooltip";

// TODO: Change Tooltip to use the new Tooltip component
// TODO: Change Button with link using the new library
export function AddMissingRepositories({ url, disabled, tooltip, className }: TAddMissingRepositories.Props) {
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

      <a href={url} target="_blank" rel="noreferrer">
        <Button
          size="s"
          className="whitespace-nowrap"
          disabled={disabled}
          {...withTooltip(tooltip || "", {
            visible: disabled && !!tooltip,
          })}
        >
          <Translate token="callout.missingRepositories.button" />
        </Button>
      </a>
    </CalloutAlert>
  );
}
