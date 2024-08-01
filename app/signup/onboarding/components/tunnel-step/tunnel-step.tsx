import { tunnelStepHooks } from "app/signup/onboarding/components/tunnel-step/tunnel-step.hooks";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { TTunnelStep } from "./tunnel-step.types";

export function TunnelStep({ icon, type, title, content, isDone, path }: TTunnelStep.Props) {
  const tagProps = tunnelStepHooks.useTunnelStepTags(type);

  return (
    <Paper
      container="transparent"
      size={"s"}
      classNames={{
        base: "flex flex-row gap-1 justify-between",
      }}
      as={BaseLink}
      htmlProps={{ href: path }}
    >
      <div className="flex flex-1 flex-row items-center gap-3">
        <div className="min-h-16 min-w-16 flex items-center justify-center rounded-lg border-1 border-container-stroke-separator">
          <Icon {...icon} size={24} />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-start gap-1">
            <Typo size="l" weight="medium" translate={title} />
            <Tag size={"xs"} {...tagProps} />
          </div>
          <Typo size="s" color={"text-2"} translate={content} />
        </div>
      </div>
      {isDone ? <Icon remixName={"ri-checkbox-circle-fill"} /> : <Icon remixName={"ri-arrow-right-s-line"} />}
    </Paper>
  );
}
