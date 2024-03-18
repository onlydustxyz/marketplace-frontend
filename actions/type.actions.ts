export type BaseQueriesDefaultType = string | number | boolean | undefined;
export type BaseQueriesDefaultParams = Record<string, BaseQueriesDefaultType>;
export interface BaseQueriesOptions<PARAMS extends BaseQueriesDefaultParams = BaseQueriesDefaultParams>
  extends Omit<RequestInit, "next" | "body"> {
  provideTag?: string[];
  revalidateTag?: string[];
  onSuccess?: () => void;
  onError?: () => void;
  revalidate?: number | false;
  params?: PARAMS;
  accessToken?: string;
  headers?: Record<string, string>;
}

export interface BaseMutationOptions<PARAMS extends BaseQueriesDefaultParams = BaseQueriesDefaultParams>
  extends Omit<BaseQueriesOptions<PARAMS>, "body"> {
  provideTag?: string[];
  revalidateTag?: string[];
  onSuccess?: () => void;
  onError?: () => void;
  revalidate?: number | false;
}

export interface BasePaginatedParams {
  [key: string]: BaseQueriesDefaultType;
  pageIndex: number;
  pageSize: number;
}
