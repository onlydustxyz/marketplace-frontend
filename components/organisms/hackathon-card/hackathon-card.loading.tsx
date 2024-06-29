import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonLoading } from "components/atoms/button/button.loading";
import { Paper, PaperLoading } from "components/atoms/paper";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { TagLoading } from "components/ds/tag/tag.loading";
import { AvatarGroupLoading } from "components/molecules/avatar-group";

import { HackathonCardDefaultVariants } from "./adapters/default/default.variants";
import { HackathonCardPort } from "./hackathon-card.types";

export function HackathonCardLoading<C extends ElementType = "div">({
  classNames,
}: Pick<HackathonCardPort<C>, "classNames">) {
  const slots = HackathonCardDefaultVariants();

  return (
    <Paper
      size="l"
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
    >
      <div className="relative flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <SkeletonEl width={80} height={28} />

            <SkeletonEl width={400} height={56} />
          </div>

          <TagLoading />
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PaperLoading width={40} height={40} />

              <SkeletonEl width={80} height={20} />
            </div>

            <div className="flex items-center gap-2">
              <PaperLoading width={40} height={40} />

              <div className="flex flex-col">
                <SkeletonEl width={112} height={20} />

                <SkeletonEl width={56} height={16} />
              </div>
            </div>
          </div>

          <AvatarGroupLoading size="xl" />
        </div>

        <ButtonLoading size="l" />
      </div>
    </Paper>
  );
}
