export type BaseQueriesDefaultParams = Record<string, string>;
export interface BaseQueriesOptions<PARAMS extends BaseQueriesDefaultParams = BaseQueriesDefaultParams>
  extends Omit<RequestInit, "next" | "body"> {
  provideTag?: string[];
  revalidateTag?: string[];
  onSuccess?: () => void;
  onError?: () => void;
  revalidate?: number | false;
  params?: PARAMS;
}

export interface BaseMutationOptions<PARAMS extends BaseQueriesDefaultParams = BaseQueriesDefaultParams>
  extends Omit<BaseQueriesOptions<PARAMS>, "body"> {
  provideTag?: string[];
  revalidateTag?: string[];
  onSuccess?: () => void;
  onError?: () => void;
  revalidate?: number | false;
}
