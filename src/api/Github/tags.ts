import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const GITHUB_TAGS = {
  all: [RESSOURCE_TAGS.GITHUB],
  installations: () => [...GITHUB_TAGS.all, "installations"],
  installation: (installations_id: string) => [...GITHUB_TAGS.installations(), { installations_id }],
};
