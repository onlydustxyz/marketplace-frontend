export interface BaseQueriesOptions extends Omit<RequestInit, "next" | "body"> {
  provideTag?: string[];
  revalidateTag?: string[];
  onSuccess?: () => void;
  onError?: () => void;
  revalidate?: number | false;
}

export interface BaseMutationOptions extends Omit<BaseQueriesOptions, "body"> {
  provideTag?: string[];
  revalidateTag?: string[];
  onSuccess?: () => void;
  onError?: () => void;
  revalidate?: number | false;
}
