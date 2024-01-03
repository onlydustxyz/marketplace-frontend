"use client";
import { Leader } from "../../../types/projects.types.ts";
import Contributor from "@/components/features/Contributor";
import RoundedImage from "@/components/layout/rounded-image/rounded-image.tsx";
import Translate from "@/components/layout/translate/translate.tsx";
import React from "react";
import { TooltipPosition, withTooltip } from "../../../../../../src/components/Tooltip";

export default function Leaders({ leaders }: { leaders: Leader[] }) {
  const formatLeadNames = (leaders: Leader[]) => leaders.map(leader => leader.login || "").join(", ");

  const renderSingleLead = (leader: Leader) => (
    <Contributor
      contributor={{
        githubUserId: leader.githubUserId,
        login: leader.login,
        avatarUrl: null,
      }}
      clickable
    />
  );

  const renderLeadImages = () => (
    <div
      className="flex flex-row -space-x-1"
      {...withTooltip(formatLeadNames(leaders), {
        visible: leaders.length > 1,
        position: TooltipPosition.Bottom,
      })}
    >
      {leaders.map(leader => (
        <RoundedImage
          rounding="circle"
          alt={leader.login || ""}
          size="xxs"
          key={leader.id}
          src={leader.avatarUrl ? `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_W_100_PREFIX}${leader.avatarUrl}` : ""} // TODO refactor this
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
      {leaders.length > 0 && (
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="project.ledBy" params={{ count: leaders.length }} />
          {leaders.length === 1 && leaders[0].login && renderSingleLead(leaders[0])}
        </div>
      )}
      {renderLeadImages()}
    </div>
  );
}
