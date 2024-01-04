import { FetchError } from "./query.type";
import { IdToken } from "@auth0/auth0-react";

/**
 * Enum representing string values for various HTTP status codes.
 */
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

/**
 * Maps HTTP status codes to corresponding strings as defined in HttpStatusStrings.
 *
 * @param {number} statusCode - The HTTP status code to be mapped.
 * @returns {HttpStatusStrings} The mapped string representation of the status code.
 */
export function mapHttpStatusToString(statusCode: number): HttpStatusStrings {
  const statusMap: { [key: number]: HttpStatusStrings } = {
    400: HttpStatusStrings.BAD_REQUEST,
    401: HttpStatusStrings.UNAUTHORIZED,
    403: HttpStatusStrings.FORBIDDEN,
    404: HttpStatusStrings.NOT_FOUND,
    409: HttpStatusStrings.CONFLICT,
    500: HttpStatusStrings.INTERNAL_SERVER_ERROR,
    501: HttpStatusStrings.NOT_IMPLEMENTED,
  };

  return statusMap[statusCode] || HttpStatusStrings.UNHANDLED_ERROR;
}

/**
 * Creates a FetchError object based on the given response and status mapper function.
 *
 * @param {Response} res - The response object from the fetch API.
 * @param {(statusCode: number) => HttpStatusStrings} mapHttpStatusToString - Function to map status codes to strings.
 * @returns {FetchError} A FetchError object containing error details.
 */
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

type HttpOptionsTypeReturn = {
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers: {
      Authorization?: string;
      "Content-Type": string;
      accept: string;
    };
  };
};

type HttpProps = {
  getIdToken: () => Promise<IdToken | undefined>;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

export async function getHttpOptions({ getIdToken, method }: HttpProps): Promise<HttpOptionsTypeReturn> {
  async function retrieveAccessToken() {
    try {
      return getIdToken();
    } catch {
      return null;
    }
  }

  const idToken = await retrieveAccessToken();

  const options = {
    method,
    headers: {
      ...(idToken?.__raw ? { Authorization: `Bearer ${idToken?.__raw}` } : {}),
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };

  return { options };
}
