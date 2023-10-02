import { OrderBy } from "src/__generated/graphql";
import { QueryContribution } from "src/types";
import { getNbLinkedContributions } from "./getNbLinkedContributions";

export function sortContributionsByLinked(
  [a, b]: [QueryContribution, QueryContribution],
  order: OrderBy.Asc | OrderBy.Desc = OrderBy.Desc
) {
  const nbLinkedA = getNbLinkedContributions(a);
  const nbLinkedB = getNbLinkedContributions(b);

  return order === OrderBy.Asc ? (nbLinkedA > nbLinkedB ? 1 : -1) : nbLinkedA < nbLinkedB ? 1 : -1;
}
