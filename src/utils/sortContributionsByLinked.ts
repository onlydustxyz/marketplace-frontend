import { OrderBy } from "src/__generated/graphql";
import { Contribution } from "src/types";

export function sortContributionsByLinked(
  [a, b]: [Contribution, Contribution],
  order: OrderBy.Asc | OrderBy.Desc = OrderBy.Desc
) {
  const nbLinkedA = a.links?.length ?? 0;
  const nbLinkedB = b.links?.length ?? 0;

  return order === OrderBy.Asc ? (nbLinkedA > nbLinkedB ? 1 : -1) : nbLinkedA < nbLinkedB ? 1 : -1;
}
