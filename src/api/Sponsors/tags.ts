import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const SPONSORS_TAGS = {
  all: [RESSOURCE_TAGS.SPONSORS],
  details: () => [RESSOURCE_TAGS.SPONSORS, "details"],
  detail_by_id: (id: string) => [...SPONSORS_TAGS.details(), { id }],
  transactions: () => [RESSOURCE_TAGS.SPONSORS, "transactions"],
};
