import { ComponentProps } from "react";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import StackLine from "src/icons/StackLine";
import { Contribution } from "src/types";

export function ContributionLinked({
  contribution,
  withTooltip = true,
  asLink = false,
  tooltipProps = {
    position: TooltipPosition.Bottom,
    variant: Variant.Blue,
  },
}: {
  contribution: ComponentProps<typeof ContributionBadge>["contribution"] & Pick<Contribution, "id" | "links">;
  withTooltip?: boolean;
  asLink?: boolean;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
}) {
  function renderBadges({ withTooltip, asLink }: { withTooltip: boolean; asLink: boolean }) {
    if (contribution.links.length) {
      return (
        <>
          {contribution.links.map(link => (
            <ContributionBadge
              key={link.githubNumber}
              contribution={link}
              withTooltip={withTooltip}
              asLink={asLink}
              tooltipProps={tooltipProps}
            />
          ))}
        </>
      );
    }

    return null;
  }

  const nbLinkedContributions = contribution.links.length;

  if (nbLinkedContributions > 3) {
    const tooltipId = `${contribution.id}-linked-tooltip`;

    return (
      <>
        <Tooltip id={tooltipId} clickable {...tooltipProps}>
          <div className="flex items-center gap-1">{renderBadges({ withTooltip: false, asLink: true })}</div>
        </Tooltip>
        <div
          data-tooltip-id={tooltipId}
          className="flex items-center gap-1 rounded-full border-0.5 border-spaceBlue-400 px-1 py-0.5 text-spaceBlue-200"
        >
          <StackLine className="text-base leading-none" />
          <span className="text-sm leading-none">{nbLinkedContributions}</span>
        </div>
      </>
    );
  }

  return renderBadges({ withTooltip, asLink });
}
