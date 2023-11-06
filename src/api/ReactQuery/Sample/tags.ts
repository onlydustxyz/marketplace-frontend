import { RESSOURCE_TAGS } from "src/api/ReactQuery/ressource-tags";

export const SAMPLE_TAGS = {
  all: [RESSOURCE_TAGS.REWARDS],
  me: () => [...SAMPLE_TAGS.all, RESSOURCE_TAGS.ME],
  me_amount: () => [...SAMPLE_TAGS.me(), "amount"],
  project: (id: string) => [...SAMPLE_TAGS.all, RESSOURCE_TAGS.PROJECTS, { projectId: id }],
  details: (key: ReadonlyArray<unknown>) => [...key, "detail"],
  detail: (key: ReadonlyArray<unknown>, id: string) => [...SAMPLE_TAGS.details(key), { id }],
};
