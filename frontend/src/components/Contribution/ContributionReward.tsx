import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import Medal2Fill from "src/icons/Medal2Fill";

export function ContributionReward({ rewards }: { rewards: number }) {
  return (
    <ContributionAttribute>
      <div className="flex items-center gap-1 text-orange-400">
        <Medal2Fill className="flex h-3.5 items-center" />
        {rewards > 1 ? <span className="text-sm leading-none">{rewards}</span> : null}
      </div>
    </ContributionAttribute>
  );
}
