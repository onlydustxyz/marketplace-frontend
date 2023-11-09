import { components } from "src/__generated/api";
import { OrderBy } from "src/__generated/graphql";

type Contribution = components["schemas"]["ContributionPageItemResponse"];

export function sortContributionsByNumber(
  [a, b]: [Contribution, Contribution],
  order: OrderBy.Asc | OrderBy.Desc = OrderBy.Desc
) {
  const { githubNumber: githubNumberA = 0 } = a;
  const { githubNumber: githubNumberB = 0 } = b;

  return order === OrderBy.Asc ? (githubNumberA > githubNumberB ? 1 : -1) : githubNumberA < githubNumberB ? 1 : -1;
}
