import { HttpStatusStrings } from "./query.utils";

export type QueryTags = ReadonlyArray<unknown>;

export interface FetchError extends Error {
  status: number;
  message: string;
  errorType: HttpStatusStrings;
}
