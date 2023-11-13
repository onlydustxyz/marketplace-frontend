import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const PROJECT_TAGS = {
  all: [RESSOURCE_TAGS.PROJECTS],
  details: () => [RESSOURCE_TAGS.PROJECTS, "details"],
  detail_by_slug: (slug: string) => [...PROJECT_TAGS.details(), { slug }],
  detail_by_id: (id: string) => [...PROJECT_TAGS.details(), { id }],
};
