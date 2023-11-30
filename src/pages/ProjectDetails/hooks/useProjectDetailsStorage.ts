import { useLocalStorage } from "src/hooks/useStorage/useStorage";

const STORAGE_KEY = "project-details-";
export const STORAGE_KEY_PROJECT_DETAILS_LAST_ADDED_REPO = `${STORAGE_KEY}last-added-repo`;

export const useProjectDetailsLastAddedRepoStorage = (projectSlug: string) => {
  const storage = useLocalStorage<string | undefined>({
    key: `${STORAGE_KEY_PROJECT_DETAILS_LAST_ADDED_REPO}-${projectSlug}`,
    initialValue: undefined,
  });

  return storage;
};
