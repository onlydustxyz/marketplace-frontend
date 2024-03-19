import { cn } from "src/utils/cn";

import { Tag } from "components/ds/tag/tag";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";
import { Translate } from "components/layout/translate/translate";

export function MenuItem({ label, endIcon, startIcon, pendingInvitationResponse, ...restProps }: TMenuItem.Props) {
  return (
    <BaseLink
      className={cn(
        "od-text-body-m rounded-xl px-4 py-2.5 text-greyscale-600 transition-all data-[active=true]:bg-white/8 data-[active=true]:text-white hover:bg-white/5",
        {
          "flex flex-row items-center justify-between gap-1": !!endIcon,
        }
      )}
      {...restProps}
    >
      <Flex alignItems="center" justifyContent="between" className="gap-2">
        <span
          className={cn({
            "flex items-center justify-start gap-1": !!startIcon,
          })}
        >
          {startIcon ? <span>{startIcon}</span> : null} <span>{label}</span>
        </span>

        {pendingInvitationResponse && (
          <Tag borderColor="multi-color" className="bg-greyscale-900 bg-noise-medium">
            <Translate token="v2.pages.settings.billing.sidebar.items.billing.new" />
          </Tag>
        )}
      </Flex>

      {endIcon ? <span>{endIcon}</span> : null}
    </BaseLink>
  );
}
