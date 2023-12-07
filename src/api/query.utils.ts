export enum HttpStatusStrings {
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
}

export function mapHttpStatusToString(statusCode: number): HttpStatusStrings | null {
  const statusMap: { [key: number]: HttpStatusStrings } = {
    400: HttpStatusStrings.BAD_REQUEST,
    403: HttpStatusStrings.FORBIDDEN,
    404: HttpStatusStrings.NOT_FOUND,
    409: HttpStatusStrings.CONFLICT,
    500: HttpStatusStrings.INTERNAL_SERVER_ERROR,
    501: HttpStatusStrings.NOT_IMPLEMENTED,
  };

  return statusMap[statusCode] || null;
}
