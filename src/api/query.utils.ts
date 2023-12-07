import { FetchError } from "./query.type";

export enum HttpStatusStrings {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
}

export function mapHttpStatusToString(statusCode: number): HttpStatusStrings {
  const statusMap: { [key: number]: HttpStatusStrings } = {
    400: HttpStatusStrings.BAD_REQUEST,
    401: HttpStatusStrings.FORBIDDEN,
    403: HttpStatusStrings.FORBIDDEN,
    404: HttpStatusStrings.NOT_FOUND,
    409: HttpStatusStrings.CONFLICT,
    500: HttpStatusStrings.INTERNAL_SERVER_ERROR,
    501: HttpStatusStrings.NOT_IMPLEMENTED,
  };

  return statusMap[statusCode] || HttpStatusStrings.UNHANDLED_ERROR;
}

export const createFetchError = (
  res: Response,
  mapHttpStatusToString: (statusCode: number) => HttpStatusStrings
): FetchError => {
  const error = new Error(res.statusText) as FetchError;
  error.status = res.status;
  error.message = res.statusText;
  error.errorType = mapHttpStatusToString(res.status);
  return error;
};
